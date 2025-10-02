import { analyticsClient, AnalyticsClientEnum, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import { Modal } from '@npm_leadtech/cv-lib-app-components';
import { useMobile } from '@npm_leadtech/cv-lib-app-components';
import { StorageManager } from '@npm_leadtech/cv-storage-js';
import translate from 'counterpart';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../internals/redux/hooks';
import { Routes } from '../../internals/router';
import { ReviewCookieEnum, ReviewStatusEnum } from '../../models/review';
import { Clock } from '../../pages/Review/ReviewPending/styles';
import { calculateIfTwoWeeksPassed } from '../ReviewSnackbar/ReviewSnackbar';
import ModalHeaderImage from './Icon.svg';
import ResumeReviewNew from './resume-review.png';
import {
    BodyText,
    ButtonContainer,
    ClockContainer,
    HeaderTitle,
    MainButton,
    ModalContainer,
    OutlinedButton,
    StyledBody,
    StyledColumn,
    StyledCustomCursor,
    StyledImg,
} from './styles';

interface Props {
    open: boolean;
    closeModal: () => void;
    onConfirmHandle: () => void;
}

const cookiesStorage = StorageManager();

function calculateTimeRemaining(dueDate?: string) {
    if (!dueDate) return 0;

    const nowTimestamp = new Date().valueOf();
    const dueDateTimestamp = new Date(dueDate).valueOf();
    const remainingTimestamp = (dueDateTimestamp - nowTimestamp) / 1000;

    return remainingTimestamp;
}

export const ReviewUnsubscribeDialog = ({ open, closeModal, onConfirmHandle }: Props) => {
    const { reviewStatus, response } = useAppSelector((state) => state.documentReview);
    const navigate = useNavigate();
    const { isMobile } = useMobile();
    const twoWeeksPassed = calculateIfTwoWeeksPassed(response?.timeline.past_due_event);
    const isReviewAlreadyViewed = cookiesStorage.getCookie(ReviewCookieEnum.REVIEWED_COOKIE);

    const isNotReviewed = reviewStatus === ReviewStatusEnum.NOT_REVIEWED;
    const title = isNotReviewed
        ? 'You’re missing the final step! Your resume review'
        : 'Don’t miss out on your resume review!';
    const body = isNotReviewed
        ? 'Enhance your resume with expert feedback and boost your job opportunities. Stand out from the crowd!'
        : 'If you have a pending Resume Review, it will be cancelled.';
    const button = isNotReviewed ? 'ASK FOR RESUME REVIEW' : 'Go to resume review';

    const [timeRemaining, setTimeRemaining] = useState<number | null>();

    useEffect(() => {
        if (!response) return;
        const timer = setInterval(() => {
            setTimeRemaining((time) => {
                if (!time) {
                    return calculateTimeRemaining(response?.timeline.past_due_event);
                } else if (time <= 0) {
                    clearInterval(timer);
                    return timeRemaining;
                } else {
                    const newUnixTime = time - 1;
                    return newUnixTime;
                }
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [response]);

    useEffect(() => {
        if (!open) return;
        if (reviewStatus === ReviewStatusEnum.REVIEWED && (twoWeeksPassed || isReviewAlreadyViewed)) return;
        else {
            const amplitudeProps = {
                'review_status': isNotReviewed ? 'unsolicited' : 'pending',
            };
            analyticsClient.sendAnalyticsEvent(AnalyticsEvent.ViewPopupUnsubscribe, amplitudeProps, [
                AnalyticsClientEnum.Amplitude,
                AnalyticsClientEnum.GA4,
            ]);
        }
    }, [open]);

    const navigateToReview = () => {
        navigate(Routes.review);
    };

    const renderButtons = () => {
        return (
            <ButtonContainer isMobile={isMobile}>
                <OutlinedButton data-qa='unsubscribe-review-continue' onClick={onConfirmHandle}>
                    {translate('Continue')}
                </OutlinedButton>
                <MainButton data-qa='unsubscribe-review-go-review' onClick={navigateToReview}>
                    {translate(button)}
                </MainButton>
            </ButtonContainer>
        );
    };

    const renderClock = () => {
        if (isNotReviewed) return;
        return (
            <ClockContainer isMobile={isMobile}>
                <span>{translate('Time remaining')}</span>
                <Clock data-qa='review-pending-clock'>
                    {!!timeRemaining
                        ? [
                            Math.trunc(timeRemaining / 60 / 60),
                            Math.trunc((timeRemaining / 60) % 60),
                            Math.trunc(timeRemaining % 60),
                        ]
                        .join(':')
                        .replace(/\b(\d)\b/g, '0$1')
                        : '00:00:00'}
                </Clock>
            </ClockContainer>
        );
    };

    const renderCursor = () => {
        if (!isNotReviewed) return;
        return <StyledCustomCursor isMobile={isMobile}> {translate('Your expert coach')} </StyledCustomCursor>;
    };

    /*if (open && reviewStatus === ReviewStatusEnum.REVIEWED && (twoWeeksPassed || isReviewAlreadyViewed)) {
        onConfirmHandle();
        return;
    }
*/
    if (isMobile)
        return (
            <ModalContainer className='modal-container'>
                <Modal
                    className='modal-itself'
                    closeHandler={() => {
                        closeModal();
                    }}
                    closeIconProps={{ 'data-qa': 'unsubscribe-review-close' }}
                    isOpen={open}
                    closeIcon={true}
                    titleProps={{ 'data-qa': 'unsubscribe-eview-modal-title' }}
                >
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <StyledBody className='body' isMobile={isMobile}>
                            <HeaderTitle isMobile={isMobile}> {translate(title)} </HeaderTitle>
                            <BodyText isMobile={isMobile}> {translate(body)}</BodyText>
                            <StyledImg src={ResumeReviewNew} />
                            {renderClock()}
                            {renderCursor()}
                        </StyledBody>
                        {renderButtons()}
                    </div>
                </Modal>
            </ModalContainer>
        );

    return (
        <Modal
            closeHandler={() => {
                closeModal();
            }}
            closeIconProps={{ 'data-qa': 'unsubscribe-close' }}
            isOpen={open}
            title={translate(title)}
            titleProps={{ 'data-qa': 'cv-checker-modal-title' }}
            actions={[renderButtons()]}
            closeIcon={true}
            image={<img src={ModalHeaderImage} />}
        >
            <StyledBody>
                <StyledColumn>
                    <StyledImg src={ResumeReviewNew} />
                </StyledColumn>
                <StyledColumn>
                    <BodyText> {translate(body)}</BodyText>
                    {renderClock()}
                </StyledColumn>
                {renderCursor()}
            </StyledBody>
        </Modal>
    );
};
