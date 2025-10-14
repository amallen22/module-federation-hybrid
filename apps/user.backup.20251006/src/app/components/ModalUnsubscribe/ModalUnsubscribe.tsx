import { Dialog } from '@mui/material';
import { analyticsClient, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import { Modal, Spinner } from '@npm_leadtech/cv-lib-app-components';
import { getLogger } from '@npm_leadtech/cv-lib-app-jsnlog';
import translate from 'counterpart';
import React, { useEffect, useState } from 'react';

import { Routes } from '../../internals/router/Routes';
import { apiService } from '../../services/ApiService';
import { SpinnerContainer } from '../MyDocuments/AddDocument/styles';
import ContentImageIcon from './img/content-icon.svg';
import ModalImage from './img/icon-cancel-subscription.svg';
import {
    ButtonBack,
    ButtonUnsubscribe,
    Container,
    ContentImage,
    ContentList,
    ContentListItem,
    ContentWrapper,
    FlexContainer,
    modalImageStyles,
    ModalSubtitle,
    ModalSubtitleMobile,
} from './styles';

interface Props {
    modalOpened: boolean;
    setModalOpened: (_modalOpened: boolean) => void;
}

const ModalUnsubscribe = ({ modalOpened, setModalOpened }: Props) => {
    const [loading, setLoading] = useState(false);
    const [unsubscribing, setUnsubscribing] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (finished) {
            window.location.href = Routes.cancelled;
        }
    }, [finished]);

    const unsubscribe = () => {
        setLoading(true);
        setUnsubscribing(true);

        apiService
        .getSubscription()
        .then(({ subscriptionId }) => {
            apiService
            .deleteSubscription(subscriptionId)
            .then(() => {
                analyticsClient.sendAnalyticsEvent(AnalyticsEvent.ClickUnsubscribeConfirm, {});
                setFinished(true);
            })
            .catch((err) => {
                getLogger().fatalException('Unsubscribe#unsubscribe DeleteSubscriptionHandler', err);
            })
            .then(() => {
                setLoading(false);
                setUnsubscribing(false);
            });
        })
        .catch((err) => {
            getLogger().fatalException('Unsubscribe#unsubscribe GetSubscriptionHandler', err);
            setLoading(false);
        });
    };

    const renderModalContent = () => {
        if (loading || unsubscribing) {
            return (
                <SpinnerContainer>
                    <Spinner color='neutral' />
                </SpinnerContainer>
            );
        }

        return (
            <>
                <Container>
                    <ContentImage src={ContentImageIcon} />
                    <ContentWrapper>
                        <ModalSubtitle>
                            {translate('Once you cancel you can no longer use our tools to:')}
                        </ModalSubtitle>
                        <ModalSubtitleMobile>
                            {translate('Remember to download all your resumes before unsubscribing.')}
                        </ModalSubtitleMobile>
                        <ContentList>
                            <ContentListItem>{translate('Download PDFs of your documents')}</ContentListItem>
                            <ContentListItem>{translate('Create personalized CVs and Cover Letters')}</ContentListItem>
                            <ContentListItem>{translate('Share your documents online')}</ContentListItem>
                        </ContentList>
                    </ContentWrapper>
                </Container>
                <FlexContainer>
                    <ButtonBack
                        href='/user/'
                        data-tm-type='event'
                        data-tm-event-category='User-Unsubscribe'
                        data-tm-event-action='button-no-cancel'
                        data-qa='return-to-dashboard-modal'
                    >
                        {translate('Return to Dashboard')}
                    </ButtonBack>
                    <ButtonUnsubscribe
                        data-tm-type='event'
                        data-tm-event-category='User-Unsubscribe'
                        data-tm-event-action='button-unsubscribe'
                        onClick={unsubscribe}
                        data-qa='cancel-subscription-modal'
                    >
                        {translate('Cancel Subscription')}
                    </ButtonUnsubscribe>
                </FlexContainer>
            </>
        );
    };

    return (
        <Dialog open={modalOpened}>
            <Modal
                closeIcon
                closeIconProps={{ 'data-qa': 'unsubscribe-close' }}
                isOpen={modalOpened}
                title={translate('Are you sure you want to cancel your subscription?')}
                titleProps={{ 'data-qa': 'unsubscribe-title' }}
                image={<img style={modalImageStyles} src={ModalImage} />}
                closeHandler={() => {
                    setModalOpened(false);
                }}
            >
                {renderModalContent()}
            </Modal>
        </Dialog>
    );
};

export { ModalUnsubscribe };
