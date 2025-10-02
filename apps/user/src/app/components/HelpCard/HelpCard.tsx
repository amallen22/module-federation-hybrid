import translate from 'counterpart';
import React from 'react';

import { APP_CONFIG } from '../../config/appConfig';
import { Card, CardText, CardTitle } from './styles';

const { contactMail, contactInfo } = APP_CONFIG;

const HelpCard = () => (
    <Card data-qa='need-any-help'>
        <CardTitle>{translate('Need any help?')}</CardTitle>
        <CardText>
            {translate(contactInfo)}{' '}
            {translate('or send an e-mail to %(appEmail)s', {
                appEmail: contactMail,
            })}
        </CardText>
    </Card>
);

export { HelpCard };
