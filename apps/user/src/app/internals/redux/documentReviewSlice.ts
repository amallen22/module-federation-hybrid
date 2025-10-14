import { analyticsClient, AnalyticsClientEnum, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    DocumentReviewState,
    InternalReviewStatusEnum,
    Recommendation,
    ReviewRequest,
    ReviewResponse,
    ReviewStatusEnum,
} from '../../models/review';
import { apiService } from '../../services/ApiService';

const initialState: DocumentReviewState = {
    loadingRequest: false,
    error: false,
    loadingResponse: false,
    response: null,
    profession: '',
    review: null,
    reviewStatus: ReviewStatusEnum.NOT_REVIEWED,
};

export const documentReviewSlice = createSlice({
    name: 'documentReview',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(requestReview.pending, (state) => {
            state.loadingRequest = true;
        })
        .addCase(requestReview.fulfilled, (state) => {
            state.loadingRequest = false;
            state.loadingResponse = true;
        })
        .addCase(requestReview.rejected, (state) => {
            state.loadingRequest = false;
            state.error = true;
            state.reviewStatus = ReviewStatusEnum.NOT_REVIEWED;
        })
        .addCase(getReviews.pending, (state) => {
            state.loadingResponse = true;
        })
        .addCase(getReviews.fulfilled, (state, action) => {
            state.response = action.payload;
            state.profession = parseProfession(action.payload);
            state.review = parseReview(action.payload);
            state.reviewStatus = parseStatus(action.payload);
            state.loadingResponse = state.reviewStatus === ReviewStatusEnum.PENDING_REVIEW;
        })
        .addCase(getReviews.rejected, (state) => {
            state.loadingResponse = false;
            state.error = true;
        });
    },
});

const parseStatus = (review: ReviewResponse | null) => {
    if (
        !review ||
        review.status === InternalReviewStatusEnum.CANCELLED ||
        review.status === InternalReviewStatusEnum.ERROR
    )
        return ReviewStatusEnum.NOT_REVIEWED;

    if (review.status === InternalReviewStatusEnum.SUCCESS) return ReviewStatusEnum.REVIEWED;

    return ReviewStatusEnum.PENDING_REVIEW;
};

const parseReview = (review: ReviewResponse | null) : Recommendation[] | null=> {
    if (!review || !review.response || !review.response.success) return null;

    const content = review.response.success.content;
    const cleanContent = content.replace('```json', '').replace('```', '');
    try {
        const parsedReview = JSON.parse(cleanContent);
        const normalizedReview = normalizeCompletions(parsedReview);
        return normalizedReview;
    } catch {
        const amplitudeProps = {
            'review_id': review.review_id,
            'openAi_response': content,
        };
        analyticsClient.sendAnalyticsEvent(AnalyticsEvent.AIReviewFail, amplitudeProps, [
            AnalyticsClientEnum.Amplitude,
            AnalyticsClientEnum.GA4,
        ]);

        const recommendation: Recommendation = {
            description: cleanContent,
            title: '',
            example: {
                before: '',
                after: ''
            }
        };

        return [recommendation];
    }
};

function normalizeCompletions(review: any): Recommendation[] {
    const index: string = Object.keys(review)[0];

    const recommendations: Recommendation[] = review[index].map((i: any): Recommendation=> {
        const recommendation: Recommendation = {
            description: '',
            title: '',
            example: {
                before: '',
                after: ''
            }
        };

        if (i.description && i.title && i.example) {
            if (typeof i.title === 'string') recommendation.description = i.description;
            if (typeof i.title === 'string') recommendation.title = i.title;
            if (i.example.before && typeof i.example.before === 'string') recommendation.example.before = i.example.before;
            if (i.example.after && typeof i.example.before === 'string') recommendation.example.after = i.example.after;  
        } else {
            const array: string[] = Object.keys(i);
            if (array[0] && i[array[0]]) recommendation.title = i[array[0]];
            if (array[1] && i[array[1]]) recommendation.description = i[array[1]];
        }
    
        return recommendation;
    });

    if (recommendations.length < 1) {
        throw new Error('AI PARSE:  Incorrect format');
    }

    return recommendations;
}


const parseProfession = (review: ReviewResponse | null) => {
    if (!review || !review.review_customization || !review.review_customization.profession) return '';

    return review.review_customization.profession;
};

export const requestReview = createAsyncThunk(
    'documents/postReview',
    async (inputParams: ReviewRequest): Promise<void> => {
        await apiService.postReview(inputParams);
    },
);

export const getReviews = createAsyncThunk('documents/getReviews', async (): Promise<ReviewResponse | null> => {
    const reviews = await apiService.getReviews();
    
    if (reviews.length < 1) return null;
    if (reviews.length === 1) return reviews[0];

    const successfulReview = reviews.find(
        (r: { status: InternalReviewStatusEnum }) => r.status === InternalReviewStatusEnum.SUCCESS,
    );
    if (successfulReview) return successfulReview;

    const pendingReview = reviews.find(
        (r: { status: InternalReviewStatusEnum }) =>
            r.status === InternalReviewStatusEnum.IN_PROGRESS || r.status === InternalReviewStatusEnum.PENDING,
    );
    if (pendingReview) return pendingReview;

    return reviews[0];
});

export default documentReviewSlice.reducer;
