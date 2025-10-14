import { analyticsClient, AnalyticsEvent, AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import { Button, InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useState } from 'react';

import useReasons from '../../hooks/useReasons';
import useSubscription from '../../hooks/useSubscription';
import { Routes } from '../../internals/router/Routes';
import { Reason } from '../../models/reason';
import { apiService } from '../../services/ApiService';
import { Footer } from '../Footer/Footer';
import {
    Container,
    Disclaimer,
    ReasonBox,
    ReasonCard,
    ReasonText,
    ReasonTextField,
    ReasonWrapper,
    Subtitle,
    Title,
    Wrapper,
} from './styles';

const Feedback = () => {
    const { subscriptionId, loadingSubscription } = useSubscription();
    const { reasons, loadingReasons } = useReasons();

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [reasonSelected, setReasonSelected] = useState<Reason | null>(null);
    const [comment, setComment] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    const handleClickReason = (reason: Reason) => {
        setComment(undefined);
        setButtonDisabled(true);
        setReasonSelected(reason);
        if (!reason.comment) {
            setButtonDisabled(false);
        }
    };

    const handleTextfieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
        if (e.target.value.length) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    };

    function redirectPage(reasonSelected: Reason) {
        if (!reasonSelected) return;

        switch (reasonSelected.target.page) {
            case 'technicalIssues':
                window.location.href = Routes.support;
                break;
            case 'productOffers':
                window.location.href = `${Routes.unsubscribe}?reasonId=${reasonSelected.id}`;
                break;
        }
    }

    const handleSubmit = () => {
        if (!reasonSelected) return;

        setLoading(true);
        apiService
        .postUnsubscribeFeedback({
            subscriptionId,
            reasonId: reasonSelected?.id,
            comment,
        })
        .then(() => {
            analyticsClient.sendAnalyticsEvent(AnalyticsEvent.SubmitFeedBackReason, {
                'unsubscribe_reason': reasonSelected.reasonText,
            });
            redirectPage(reasonSelected);
        })
        .catch(() => {
            setLoading(false);
        });
    };

    const renderReasonTextfield = (reason: Reason) => {
        const { id, comment: commentReason } = reason;
        if (!commentReason || reasonSelected?.id !== id) return null;
        return (
            <ReasonBox data-qa={`${reason.id}-commentBox`}>
                {commentReason?.text ? (
                    <ReasonText data-qa={`${reason.id}-commentTitle`}>{commentReason.text}</ReasonText>
                ) : null}
                <ReasonTextField
                    placeholder={commentReason?.placeholder}
                    rows={4}
                    value={comment}
                    onChange={handleTextfieldChange}
                    data-qa={`${reason.id}-textfield`}
                />
            </ReasonBox>
        );
    };

    const renderReasons = () => {
        if (!reasons || !reasons.length) return null;

        return reasons.map((reason) => {
            const { id, reasonText } = reason;
            return (
                <ReasonWrapper key={reason.id} data-qa={`${reason.id}-wrapper`}>
                    <ReasonCard
                        className={reasonSelected?.id === id ? 'selected' : ''}
                        onClick={() => handleClickReason(reason)}
                        data-qa={`${reason.id}-card`}
                    >
                        {reasonText}
                    </ReasonCard>
                    {renderReasonTextfield(reason)}
                </ReasonWrapper>
            );
        });
    };

    if (loadingReasons || loadingSubscription || loading) {
        return (
            <div className='cv-initial-loading' data-qa='user-loader'>
                <InitialLoading />
            </div>
        );
    }

    return (
        <>
            <AnalyticsLocationChange analyticsViewEvent='view_feedback' />
            <Wrapper>
                <Container>
                    <Title>{translate('Please, indicate your motive before continuing')}</Title>
                    <Subtitle>
                        {translate(
                            'Let us know why you’ve decided to cancel your Premium membership, so that we can improve our services for the future',
                        )}
                    </Subtitle>
                    {renderReasons()}
                    <Button onClick={handleSubmit} data-qa='continue-to-unsubscribe' disabled={buttonDisabled}>
                        {translate('SUBMIT AND CONTINUE')}
                    </Button>
                    <Disclaimer>
                        {translate(
                            'Your opinion is important to us, so thank you very much for helping us to continue improving our services',
                        )}
                    </Disclaimer>
                </Container>
            </Wrapper>
            <Footer />
        </>
    );
};

export default Feedback;
