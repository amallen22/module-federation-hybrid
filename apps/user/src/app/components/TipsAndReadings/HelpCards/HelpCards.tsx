import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React from 'react';

import { APP_CONFIG } from '../../../config/appConfig';
import EbookIcon from './icons/book.svg';
import HeadPhonesIcon from './icons/headphones.svg';
import LightIcon from './icons/lightbulb.svg';
import MailIcon from './icons/mail-icon.svg';
import {
    Card,
    CardIcon,
    CardIconWrapper,
    CardSubTitle,
    CardsWrapper,
    CardTextWrapper,
    CardTitle,
    FlexWrapper,
} from './styles';

const { domain, contactUrl, contactInfo, contactMail } = APP_CONFIG;

const HelpCards = () => {
    const contactInfoUrl = `//${domain}${contactUrl}`;

    const renderShareIdeas = () => {
        if (APP_CONFIG.assets !== 'rch') {
            return null;
        }

        const newDomain = domain.split('.')[0];
        const ideasUrl = `https://${newDomain}.ideas.aha.io/ideas/new`;

        return (
            <Card color={dsmColors.colorWarning600}>
                <FlexWrapper>
                    <CardIcon src={LightIcon} />
                    <CardTextWrapper data-qa='ideas-panel-card'>
                        <CardTitle>{translate('Have a suggestion?')}</CardTitle>
                        <CardSubTitle>{translate('Let us know your thoughts')}</CardSubTitle>
                    </CardTextWrapper>
                </FlexWrapper>
                <CardIconWrapper href={ideasUrl} target='_blank'>
                    <ArrowForwardRoundedIcon />
                </CardIconWrapper>
            </Card>
        );
    };

    const renderRecommended = () => (
        <Card color={dsmColors.colorPrimary500}>
            <FlexWrapper>
                <CardIcon src={HeadPhonesIcon} />
                <CardTextWrapper data-qa='contact-us-card'>
                    <CardTitle>{translate('Ask the experts')}</CardTitle>
                    <CardSubTitle>
                        {translate(contactInfo)}{' '}
                        {translate('or send an e-mail to %(appEmail)s', {
                            appEmail: contactMail,
                        })}
                    </CardSubTitle>
                </CardTextWrapper>
            </FlexWrapper>
            <CardIconWrapper href={contactInfoUrl} target='_blank'>
                <img src={MailIcon} />
            </CardIconWrapper>
        </Card>
    );

    const renderEbook = () => {
        if (APP_CONFIG.assets !== 'rch') {
            return null;
        }

        const appName = APP_CONFIG.appName.split(' ')[0];
        const bookDownloadUrl = `//download.${domain}/book/v1.3/A_Winning_Resume_Kit_${appName}.pdf`;

        return (
            <Card color={dsmColors.colorPrimary100}>
                <FlexWrapper>
                    <CardIcon src={EbookIcon} />
                    <CardTextWrapper data-qa='book-panel-card'>
                        <CardTitle>{translate('Download your Winning Resume Kit')}</CardTitle>
                        <CardSubTitle>{translate('Get to grips with resume writing')}</CardSubTitle>
                    </CardTextWrapper>
                </FlexWrapper>
                <CardIconWrapper href={bookDownloadUrl} target='_blank'>
                    <ArrowForwardRoundedIcon />
                </CardIconWrapper>
            </Card>
        );
    };

    return (
        <CardsWrapper>
            {renderShareIdeas()}
            {renderRecommended()}
            {renderEbook()}
        </CardsWrapper>
    );
};

export { HelpCards };
