import { analyticsClient, AnalyticsClientEnum, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import { Modal } from '@npm_leadtech/cv-lib-app-components';
import { useMobile } from '@npm_leadtech/cv-lib-app-components';
import StorePackage from '@npm_leadtech/cv-storage-js';
import translate from 'counterpart';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../internals/redux/hooks';
import { Routes } from '../../internals/router';
import { ReviewCookieEnum, ReviewStatusEnum } from '../../models/review';
import ModalHeaderImage from './Icon.svg';
import ResumeReviewNew from './resume-review.png';
import {
    BodyText,
    ButtonContainer,
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

const cookiesStorage = StorePackage.StorageManager();

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
    const isReviewAlreadyViewed: boolean = cookiesStorage.getCookie(ReviewCookieEnum.REVIEWED_COOKIE);

    const isNotReviewed = reviewStatus === ReviewStatusEnum.NOT_REVIEWED;
    const title = 'You’re missing the final step! Your resume review';
    const body = 'Enhance your resume with expert feedback and boost your job opportunities. Stand out from the crowd!';
    const button = 'ASK FOR RESUME REVIEW';

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
        if (reviewStatus === ReviewStatusEnum.REVIEWED && isReviewAlreadyViewed) return;
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


    const renderCursor = () => {
        if (!isNotReviewed) return;
        return <StyledCustomCursor isMobile={isMobile}> {translate('Your expert coach')} </StyledCustomCursor>;
    };

    if (open && reviewStatus === ReviewStatusEnum.REVIEWED && isReviewAlreadyViewed) {
        onConfirmHandle();
        return;
    }

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
                </StyledColumn>
                {renderCursor()}
            </StyledBody>
        </Modal>
    );
};
