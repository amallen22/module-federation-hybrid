import { analyticsClient, AnalyticsClientEnum, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import translate from 'counterpart';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Routes } from '../../../internals/router';
import { ActionButton } from '../ActionButton/ActionButton';
import cvImage from '../Assets/CV.png';
import { PMColorsEnum } from '../Definitions';
import { SimplePromotionalModule } from '../SimplePromotionalModule';
import { CardBody, CardTitle, LeftColumn, PrimaryChip, RightColumn } from '../styles';
import { Background, CVImage, Foreground } from './styles';

interface Props {
    language: string;
}

export const ReviewPM = ({ language }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const sendBannerdashAmplitudeEvent = (event: typeof AnalyticsEvent) => {
        analyticsClient.sendAnalyticsEvent(event, {}, [AnalyticsClientEnum.Amplitude, AnalyticsClientEnum.GA4]);
    };

    const onSubmit = () => {
        sendBannerdashAmplitudeEvent(AnalyticsEvent.ClickBannerdashReview);
        navigate(Routes.review);
    };

    return (
        <SimplePromotionalModule
            disabled={false}
            color={PMColorsEnum.BLUE}
            dataQa='dashboard-module-review-resume'
            handleClick={onSubmit}
            setIsHovered={(isHovered: boolean) => setIsHovered(isHovered)}
            id='ReviewYourCV'
            tabIndex={0}
        >
            <LeftColumn tabIndex={-1}>
                <PrimaryChip>{translate('Next step')}</PrimaryChip>
                <CardTitle>{translate('Get your resume reviewed by experts')}</CardTitle>
                <CardBody>
                    {translate('Receive professional feedback within 48h, then apply to your dream job.')}
                </CardBody>
                {language !== 'de-DE' && (
                    <ActionButton isHovered={isHovered} handleClick={onSubmit}>
                        {translate('Request resume review')}
                    </ActionButton>
                )}
            </LeftColumn>
            <RightColumn tabIndex={-1} style={{ padding: '0' }} className='right'>
                <Background isHovered={isHovered} />
                <CVImage src={cvImage} />
                <Foreground isHovered={isHovered} />
            </RightColumn>
        </SimplePromotionalModule>
    );
};
