import { analyticsClient, AnalyticsClientEnum, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    DocumentReviewState,
    InternalReviewStatusEnum,
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
            state.loadingResponse = false;
            state.response = action.payload;
            state.profession = parseProfession(action.payload);
            state.review = parseReview(action.payload);
            state.reviewStatus = parseStatus(action.payload);
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

const parseReview = (review: ReviewResponse | null) => {
    if (!review || !review.response || !review.response.success) return;

    const content = review.response.success.content;

    try {
        const parsedReview = JSON.parse(content);

        if (!parsedReview.recommendations) {
            const recommendations = {
                'recommendations': parsedReview,
            };
            const amplitudeProps = {
                'review_id': review.review_id,
                'openAi_response': content,
                'controlled': recommendations && Array.isArray(recommendations) ? true : false,
            };
            analyticsClient.sendAnalyticsEvent(AnalyticsEvent.AIReviewFail, amplitudeProps, [
                AnalyticsClientEnum.Amplitude,
                AnalyticsClientEnum.GA4,
            ]);
            return recommendations;
        }
        return parsedReview;
    } catch {
        const processedContent = content.replace('```json', '').replace('```', '');
        let parsedReview = JSON.parse(processedContent);
        let recommendations = {};

        if (!parsedReview.recommendations) {
            recommendations = {
                'recommendations': parsedReview,
            };
            parsedReview = recommendations;
        }
        // Open AI sometimes returns a badly formatted JSON. We handle this here, and send an event to keep track of this and any other open ai malfunctions
        const amplitudeProps = {
            'review_id': review.review_id,
            'openAi_response': content,
            'controlled': parsedReview.recommendations && Array.isArray(parsedReview.recommendations) ? true : false,
        };
        analyticsClient.sendAnalyticsEvent(AnalyticsEvent.AIReviewFail, amplitudeProps, [
            AnalyticsClientEnum.Amplitude,
            AnalyticsClientEnum.GA4,
        ]);

        return parsedReview;
    }
};

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
