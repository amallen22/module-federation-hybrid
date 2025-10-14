import { AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import React from 'react';

import { Footer } from '../../components/Footer/Footer';
import { PreviewSnackbar } from '../../components/PreviewSnackbar/PreviewSnackbar';
import { useAppSelector } from '../../internals/redux/hooks';
import { ReviewStatusEnum } from '../../models/review';
import { ReviewDone } from './ReviewDone/ReviewDone';
import { ReviewToDo } from './ReviewToDo/ReviewToDo';
import { PageContainer, PageWrapper } from './styles';

export const Review = () => {
    const { response, reviewStatus } = useAppSelector((state) => state.documentReview);
    const documents = useAppSelector((state) => state.documents.resumes);

    const customProp = [{ name: 'review_status', value: reviewStatus }];
    const document = documents.find(({ documentId }) => documentId === response?.document_id);

    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

    const isOlderThanOneYear = document?.modifiedAt
        ? Date.now() - new Date(document.modifiedAt).getTime() > ONE_YEAR_MS
        : false;

    const hasEmptyPreview = Boolean(document && !document.previewThumbnail && isOlderThanOneYear);

    const reviewContent = () => {
        if (reviewStatus === ReviewStatusEnum.REVIEWED) {
            return <ReviewDone />;
        }
        else {
            return <ReviewToDo />;
        }
    };

    return (
        <PageWrapper>
            <AnalyticsLocationChange analyticsViewEvent='view_review' customProps={customProp} />
            {hasEmptyPreview && <PreviewSnackbar />}
            <PageContainer className='pageContainer'>{reviewContent()}</PageContainer>
            <Footer />
        </PageWrapper>
    );
};
