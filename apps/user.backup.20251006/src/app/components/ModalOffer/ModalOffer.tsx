import { Dialog } from '@mui/material';
import { analyticsClient, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import { Modal } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_CONFIG } from '../../config/appConfig';
import useProfile from '../../hooks/useProfile';
import { Routes } from '../../internals/router';
import { apiService } from '../../services/ApiService';
import { modalConfig } from './config';
import { Button, CaptionText, Content, ContentText, ContentTitle, ContentWrapper } from './styles';

interface ModalConfig {
    headerImage: any;
    title?: string;
    dataQaTitle: string;
    subtitle?: string;
    contentImage: any;
    isFixed: boolean;
    closeIcon: boolean;
}
interface Props {
    modalHandler: (_state: boolean) => void;
    modalOpened: boolean;
    modalTitle: string;
    modalText: string;
    modalOfferText: string;
    subscriptionId?: string;
    productId: string;
    productType: string;
}

const ModalOffer = ({
    modalHandler,
    modalOpened,
    modalTitle,
    modalText,
    modalOfferText,
    subscriptionId,
    productId,
    productType,
}: Props) => {
    const navigate = useNavigate();

    const { email } = useProfile();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [config, setConfig] = useState<ModalConfig>(modalConfig.confirmation);

    const updateSubscription = () => {
        if (subscriptionId) {
            setLoading(true);
            setConfig(modalConfig.loading);
            apiService.putSubscription({ productId, subscriptionId }).then(({ subscriptionId }) => {
                getNewSubscription(subscriptionId);
            });
            analyticsClient.sendAnalyticsEvent(AnalyticsEvent.ClickModalButtonReplan, {
                'product_type': productType,
            });
        }
    };

    const getNewSubscription = (updatedSubscriptionId: string) => {
        apiService
        .getSubscriptions({ subscriptionId: updatedSubscriptionId })
        .then(({ subscriptionId, productId }) => {
            if (!subscriptionId && !productId) {
                setConfig(modalConfig.error);
                setError(true);
            }
            setLoading(false);
            setSuccess(true);
            setConfig(modalConfig.success);
        })
        .catch(() => {
            setLoading(false);
            setError(true);
            setConfig(modalConfig.error);
        });
    };

    function goToDashboard() {
        navigate(Routes.dashboard);
    }

    function backToOffers() {
        setConfig(modalConfig.confirmation);
        setError(false);
        modalHandler(false);
    }

    const renderButtons = () => {
        if (success) {
            return (
                <Button data-qa='returnToDashboard' onClick={goToDashboard} loading={loading}>
                    {translate('Visit My Dashboard')}
                </Button>
            );
        }

        if (error) {
            return (
                <Button data-qa='backToOffers' onClick={backToOffers} loading={loading}>
                    {translate('BACK TO OFFERS')}
                </Button>
            );
        }

        return (
            <Button data-qa='applyToOffer' onClick={updateSubscription} loading={loading}>
                {translate('APPLY OFFER')}
            </Button>
        );
    };

    const renderContentText = () => {
        if (success) {
            return (
                <Content>
                    <ContentTitle>{modalOfferText}</ContentTitle>
                    <ContentText>
                        {translate(
                            'This purchase will be charged to the same card you used for the previous subscription',
                        )}
                    </ContentText>
                    <ContentTitle>{translate('Account information')}</ContentTitle>
                    <ContentText>{email}</ContentText>
                </Content>
            );
        }

        if (error) {
            return (
                <Content>
                    <b>{translate('We were not able to apply the offer.')}</b>
                    <br />
                    {translate('Please reload the page. If the error persists, try again later.')}
                </Content>
            );
        }

        return <Content>{modalText}</Content>;
    };

    const renderCaption = () => {
        if (!success) {
            return null;
        }

        return (
            <CaptionText>
                {translate(
                    'You can cancel your subscription at any time via your account settings. If you need any assistance please contact our customer service team at %(appEmail)s',
                    { appEmail: APP_CONFIG.contactMail },
                )}
            </CaptionText>
        );
    };

    function renderTitle() {
        if (config.title) {
            return translate(config.title);
        }

        return modalTitle;
    }

    function renderSubtitle() {
        if (config.subtitle) {
            return translate(config.subtitle);
        }
    }

    return (
        <Dialog open={modalOpened}>
            <Modal
                closeIcon={config.closeIcon}
                closeIconProps={{ 'data-qa': 'unsubscribe-close' }}
                closeHandler={() => {
                    modalHandler(false);
                }}
                isOpen={modalOpened}
                title={renderTitle()}
                titleProps={{ 'data-qa': config.dataQaTitle }}
                description={renderSubtitle()}
                image={config.headerImage}
                isFixed={config.isFixed}
                actions={[renderButtons()]}
            >
                <ContentWrapper data-qa='modalContent' loading={loading}>
                    {config.contentImage}
                    {renderContentText()}
                </ContentWrapper>
                {renderCaption()}
            </Modal>
        </Dialog>
    );
};

export default ModalOffer;
