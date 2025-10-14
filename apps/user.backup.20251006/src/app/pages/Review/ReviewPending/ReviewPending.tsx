import { InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useEffect, useState } from 'react';

import { ReviewLoader } from '../../../components/ReviewLoader/ReviewLoader';
import { getReviews } from '../../../internals/redux/documentReviewSlice';
import { useAppDispatch, useAppSelector } from '../../../internals/redux/hooks';
import { Clock, PageWrapper, SubTitle, Title } from './styles';

function calculateTimeRemaining(dueDate?: string) {
    if (!dueDate) return 0;

    const nowTimestamp = new Date().valueOf();
    const dueDateTimestamp = new Date(dueDate).valueOf();

    const remainingTimestamp = (dueDateTimestamp - nowTimestamp) / 1000;
    return remainingTimestamp;
}

export const ReviewPending = () => {
    const dispatch = useAppDispatch();
    const { response } = useAppSelector((state) => state.documentReview);

    const [timeRemaining, setTimeRemaining] = useState<number | null>();

    useEffect(() => {
        if (!response) return;
        const timer = setInterval(() => {
            setTimeRemaining((time) => {
                if (!time) {
                    return calculateTimeRemaining(response?.timeline.past_due_event);
                }
                if (time === 0) {
                    clearInterval(timer);
                    dispatch(getReviews());
                    return 0;
                } else {
                    const newUnixTime = time - 1;
                    return newUnixTime;
                }
            });
        }, 1000);
    }, [response]);

    if (!response || !timeRemaining) return <InitialLoading />;

    return (
        <PageWrapper>
            <ReviewLoader />
            <Title>{translate('Your resume is being reviewed')}</Title>
            <SubTitle>{translate('Come back in')}</SubTitle>
            <Clock data-qa='review-pending-clock'>
                {[
                    Math.trunc(timeRemaining / 60 / 60),
                    Math.trunc((timeRemaining / 60) % 60),
                    Math.trunc(timeRemaining % 60),
                ]
                .join(':')
                .replace(/\b(\d)\b/g, '0$1')}
            </Clock>
        </PageWrapper>
    );
};
