import { Button, InitialLoading, Toast } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import sanitizeHtml from 'sanitize-html';

import { Footer } from '../../components/Footer/Footer';
import { APP_CONFIG } from '../../config/appConfig';
import { dateStringComposer } from '../../helpers/dateFormatter';
import useProfile from '../../hooks/useProfile';
import { Routes } from '../../internals/router/Routes';
import { CancelDate, CancelTitle, Card, CardHeader, Container, InfoItem, Logo, Title, Wrapper } from './styles';

const sanitizeProps = {
    allowedTags: ['b'],
};

const { appName, domain } = APP_CONFIG;

const basePath = `https://static.${domain}`;

const getAssetPathFromS3 = (subPath: string) => {
    return `${basePath}${subPath}`;
};

const Cancellation = () => {
    const { email, userLanguage } = useProfile();
    const [visibleToast, setVisibleToast] = useState(true);

    const handleWarningToast = () => {
        setVisibleToast(!visibleToast);
    };

    const goToDashboard = () => {
        window.location.href = Routes.dashboard;
    };

    if (!email) {
        return (
            <div className='cv-initial-loading' data-qa='user-loader'>
                <InitialLoading />
            </div>
        );
    }

    const unsubscribeText = `<b>${translate('Unsubscribe successful!')}</b>`;

    return (
        <>
            <Wrapper>
                {visibleToast ? (
                    <Toast type='toast-success' onCloseHandler={() => handleWarningToast()}>
                        {parse(sanitizeHtml(unsubscribeText, sanitizeProps))}
                    </Toast>
                ) : null}

                <Container>
                    <Title>
                        {translate('Thankyou for using %(appName)s', {
                            appName,
                        })}
                    </Title>
                    <Card>
                        <CardHeader>
                            <Logo
                                height='32'
                                width='auto'
                                src={`${getAssetPathFromS3('/assets/')}${APP_CONFIG.assets}/logo_desktop.png`}
                            />
                            <CancelTitle>{translate('CANCELLATION DATE')}</CancelTitle>
                            <CancelDate data-qa='unsubscribe-date'>
                                {dateStringComposer({
                                    date: new Date(),
                                    userLanguage,
                                })}
                            </CancelDate>
                        </CardHeader>
                        <InfoItem>
                            {translate(
                                'We will save all your documents in case you wish to sign up again in the future.',
                            )}
                        </InfoItem>
                        <InfoItem data-qa='unsubscribe-confirmation-email'>
                            {translate(
                                'You will receive a confirmation email at %(userEmail)s, make sure to check your spam folder.',
                                { userEmail: email },
                            )}
                        </InfoItem>
                        <InfoItem>{translate('You won’t receive any more %(appName)s charges.', { appName })}</InfoItem>
                    </Card>
                    <Button onClick={goToDashboard} data-qa='return-to-dashboard'>
                        {translate('Return to Dashboard')}
                    </Button>
                </Container>
            </Wrapper>
            <Footer />
        </>
    );
};

export default Cancellation;
