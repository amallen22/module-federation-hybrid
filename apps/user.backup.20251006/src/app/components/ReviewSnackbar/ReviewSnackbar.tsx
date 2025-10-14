import { Toast } from '@npm_leadtech/cv-lib-app-components';
import { StorageManager } from '@npm_leadtech/cv-storage-js';
import translate from 'counterpart';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../internals/redux/hooks';
import { Routes } from '../../internals/router';
import { ReviewCookieEnum, ReviewStatusEnum } from '../../models/review';
import { Link, Text, ToastContainer } from './styles';

const cookiesStorage = StorageManager();

const twoWeeksInMilliseconds = 1296000;

export function calculateIfTwoWeeksPassed(dueDate?: string) {
    if (!dueDate) return false;

    const nowTimestamp = new Date().valueOf();
    const dueDateTimestamp = new Date(dueDate).valueOf();
    const differenceTimestamp = (nowTimestamp - dueDateTimestamp) / 1000;

    return differenceTimestamp > twoWeeksInMilliseconds;
}

export const ReviewSnackbar = () => {
    const { reviewStatus, response } = useAppSelector((state) => state.documentReview);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const cookieValue = cookiesStorage.getCookie(ReviewCookieEnum.REVIEWED_COOKIE);

    console.log('ReviewSnackbar - reviewStatus ====================>', reviewStatus);
    console.log('ReviewSnackbar - response ====================>', response);
    console.log('ReviewSnackbar - cookieValue ====================>', cookieValue);
    console.log('ReviewSnackbar - isOpen ====================>', isOpen);


    useEffect(() => {
        const twoWeeksPassed = calculateIfTwoWeeksPassed(response?.timeline.past_due_event);

        if (
            reviewStatus === ReviewStatusEnum.PENDING_REVIEW &&
            !cookiesStorage.getCookie(ReviewCookieEnum.IN_REVIEW_COOKIE) &&
            !twoWeeksPassed
        ) {
            setIsOpen(true);
        } else if (
            reviewStatus === ReviewStatusEnum.REVIEWED &&
            !cookiesStorage.getCookie(ReviewCookieEnum.REVIEWED_COOKIE) &&
            !twoWeeksPassed
        ) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [reviewStatus, cookieValue]);

    const onSubmit = () => {
        navigate(Routes.review);
        onCloseHandler();
    };

    const onCloseHandler = () => {
        setCookie();
        setIsOpen(false);
    };

    const setCookie = () => {
        if (reviewStatus === ReviewStatusEnum.PENDING_REVIEW)
            cookiesStorage.setCookie(ReviewCookieEnum.IN_REVIEW_COOKIE, true);
        if (reviewStatus === ReviewStatusEnum.REVIEWED)
            cookiesStorage.setCookie(ReviewCookieEnum.REVIEWED_COOKIE, true);
    };

    const toastContent = () => {
        if (reviewStatus === ReviewStatusEnum.PENDING_REVIEW && isOpen)
            return <Text>{translate('Your resume review request was submitted.')}</Text>;

        if (reviewStatus === ReviewStatusEnum.REVIEWED && isOpen)
            return (
                <>
                    <Text>{translate('Your resume review is ready.')}</Text>
                    <Link onClick={onSubmit} data-qa='review-snackbar-view-button'>
                        {translate('View')}
                    </Link>
                </>
            );
    };

    // if (isOpen)
    if (!isOpen)
        return (
            <ToastContainer data-qa='review-snackbar'>
                <h2>Hola REVIEW</h2>
                <Toast type='toast-success' onCloseHandler={() => onCloseHandler()} dataQa='review-snackbar'>
                    {toastContent()}
                </Toast>
            </ToastContainer>
        );

    return <></>;
};
