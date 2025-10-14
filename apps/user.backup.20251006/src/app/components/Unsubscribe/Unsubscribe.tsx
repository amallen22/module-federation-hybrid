import { analyticsClient, AnalyticsEvent, AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import { Button, InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import { getLogger } from '@npm_leadtech/cv-lib-app-jsnlog';
import translate from 'counterpart';
import React, { useEffect, useState } from 'react';

import { APP_CONFIG } from '../../config/appConfig';
import useProfile from '../../hooks/useProfile';
import { Routes } from '../../internals/router/Routes';
import { Document, Documents, DocumentTypeEnum } from '../../models/documents';
import { ApiError } from '../../models/error';
import { apiService } from '../../services/ApiService';
import { FrontLogService } from '../../services/FrontLogService';
import { Footer } from '../Footer/Footer';
import GenericResume from './img/generic-resume.svg';
import IconCall from './img/icon-call.svg';
import IconProductivity from './img/icon-productivity.svg';
import IconStamp from './img/stamp-pdf.svg';
import {
    Container,
    ContainerCta,
    Content,
    ContentImage,
    ContentReason,
    ContentTitle,
    DocumentGenericPreview,
    DocumentPreview,
    OptionCard,
    OptionImage,
    OptionLink,
    OptionsWrapper,
    OptionText,
    Stamp,
    StyledContainer,
    StyledSubtitle,
    Subtitle,
    Title,
    UnsubscribeButton,
    UnsubscribeContainer,
    Wrapper,
} from './styles';

interface Props {
    subscriptionId?: string;
}

const Unsubscribe = ({ subscriptionId }: Props) => {
    const { loadingProfile, firstName } = useProfile();
    const [loading, setLoading] = useState(true);
    const [document, setDocument] = useState<Document | null>(null);

    const contactUrl = `//${APP_CONFIG.domain}${APP_CONFIG.contactUrl}`;

    const loadDocuments = () => {
        const params = {
            documentType: DocumentTypeEnum.Resume,
            limit: 1,
        };
        apiService
        .getDocumentList(params)
        .then((res: Documents) => {
            const { documents } = res;
            if (documents.length > 0) {
                setDocument(documents[0]);
            }
            setLoading(false);
        })
        .catch((err: Error) => {
            FrontLogService.logAjaxResponse({
                className: 'MyDocuments',
                funcName: 'loadDocuments',
                err,
            });
        });
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    const unsubscribe = () => {
        if (!subscriptionId) return;
        setLoading(true);
        apiService
        .deleteSubscription(subscriptionId)
        .then(() => {
            analyticsClient.sendAnalyticsEvent(AnalyticsEvent.ClickUnsubscribeConfirm, {});
            window.location.href = Routes.cancelled;
        })
        .catch((err) => {
            getLogger().fatalException('Unsubscribe#unsubscribe DeleteSubscriptionHandler', err);
            setLoading(false);
        });
    };

    const goToDashboard = () => {
        window.location.href = Routes.dashboard;
    };

    if (loadingProfile || loading) {
        return (
            <div className='cv-initial-loading'>
                <InitialLoading />
            </div>
        );
    }

    const title = firstName
        ? translate('%(userName)s, we’re sad to see you go', {
            userName: firstName,
        })
        : translate('We are sad to see you go');

    const renderResumeImage = () => {
        if (!document || !document.previewThumbnail || document.previewThumbnail.length === 0) {
            return <DocumentGenericPreview src={GenericResume} data-qa='last-cv-preview' />;
        }

        return <DocumentPreview src={document.previewThumbnail} data-qa='last-cv-preview' />;
    };

    return (
        <UnsubscribeContainer>
            <AnalyticsLocationChange analyticsViewEvent='view_unsubscribe' />
            <Wrapper>
                <Title data-qa='person-name-text'>{title}</Title>
                <Subtitle>{translate('Are you sure you no longer need career assistance?')}</Subtitle>
                <Container>
                    <ContentImage>
                        <Stamp src={IconStamp} />
                        {renderResumeImage()}
                    </ContentImage>
                    <Content>
                        <ContentTitle>
                            {translate(
                                'From the moment you cancel your Premium account, you will lose access to these features:',
                            )}
                        </ContentTitle>
                        <ContentReason>{translate('Unlimited resumes and cover letters')}</ContentReason>
                        <ContentReason>{translate('Downloading in PDF format')}</ContentReason>
                        <ContentReason>{translate('Access to premium templates')}</ContentReason>
                        <ContentReason>{translate('Expert tips and real examples')}</ContentReason>
                        <ContentReason>{translate('Online professional advice and support')}</ContentReason>
                        <ContentReason>{translate('Sharing resumes and applying for jobs online')}</ContentReason>
                    </Content>
                </Container>
                <ContainerCta>
                    <Button onClick={goToDashboard} data-qa='cancel-unsubscribe-button'>
                        {translate('No, keep Premium account')}
                    </Button>
                    <UnsubscribeButton onClick={unsubscribe} data-qa='confirm-unsubscribe-button'>
                        {translate('Yes, cancel my account')}
                    </UnsubscribeButton>
                </ContainerCta>
            </Wrapper>
            <OptionsWrapper>
                <StyledContainer>
                    <StyledSubtitle>{translate('Other options to consider')}</StyledSubtitle>
                    <OptionCard>
                        <OptionImage src={IconCall} />
                        <OptionText>
                            {translate(
                                'Have a chat with our customer service team if you are having difficulties using any of our tools',
                            )}
                        </OptionText>
                        <OptionLink href={contactUrl}>{translate('Get extra help')}</OptionLink>
                    </OptionCard>
                    <OptionCard>
                        <OptionImage src={IconProductivity} />
                        <OptionText>
                            {translate(
                                'Create a unique cover letter that will get you 67 %% more interviews when applying',
                            )}
                        </OptionText>
                        <OptionLink href='/editor/letter'>{translate('Create a cover letter')}</OptionLink>
                    </OptionCard>
                </StyledContainer>
            </OptionsWrapper>
            <Footer />
        </UnsubscribeContainer>
    );
};

export default Unsubscribe;
