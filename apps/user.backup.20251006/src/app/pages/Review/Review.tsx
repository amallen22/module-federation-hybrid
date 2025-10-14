/* eslint-disable camelcase */
import { AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import { InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import React from 'react';

import { Footer } from '../../components/Footer/Footer';
import { useAppSelector } from '../../internals/redux/hooks';
import { ReviewStatusEnum } from '../../models/review';
import { ReviewDone } from './ReviewDone/ReviewDone';
import { ReviewPending } from './ReviewPending/ReviewPending';
import { ReviewToDo } from './ReviewToDo/ReviewToDo';
import { PageContainer, PageWrapper } from './styles';

export const Review = () => {
    const { reviewStatus, loadingResponse } = useAppSelector((state) => state.documentReview);
    const customProp = [{ name: 'review_status', value: reviewStatus }];

    if (loadingResponse) return <InitialLoading />;

    const reviewContent = () => {
        if (reviewStatus === ReviewStatusEnum.PENDING_REVIEW) {
            return <ReviewPending />;
        }
        if (reviewStatus === ReviewStatusEnum.REVIEWED) {
            return <ReviewDone />;
        }
        if (reviewStatus === ReviewStatusEnum.NOT_REVIEWED) {
            return <ReviewToDo />;
        }
    };

    return (
        <PageWrapper>
            <AnalyticsLocationChange analyticsViewEvent='view_review' customProps={customProp} />
            <PageContainer className='pageContainer'>{reviewContent()}</PageContainer>
            <Footer />
        </PageWrapper>
    );
};
