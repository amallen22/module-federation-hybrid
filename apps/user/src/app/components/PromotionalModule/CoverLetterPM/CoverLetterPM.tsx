import { analyticsClient, AnalyticsClientEnum, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import translate from 'counterpart';
import { AnimationDirection } from 'lottie-web';
import React, { useRef, useState } from 'react';
import Lottie from 'react-lottie-player';

import useManageDocument from '../../../hooks/useManageDocument';
import useProfile from '../../../hooks/useProfile';
import { DocumentTypeEnum } from '../../../models/documents';
import { ActionButton } from '../ActionButton/ActionButton';
import coverLetterLeft from '../Assets/cover-letter-left.json';
import coverLetterRight from '../Assets/cover-letter-right.json';
import { PMColorsEnum, PMColorsType } from '../Definitions';
import { SimplePromotionalModule } from '../SimplePromotionalModule';
import { CardBody, CardTitle, LeftColumn, PrimaryChip, RightColumn, TertiaryChip } from '../styles';
import { AnimationContainer, ColumnContainer } from './styles';

interface Props {
    color: PMColorsType;
}

export const CoverLetterPM = ({ color }: Props) => {
    const { groupPermission } = useProfile();
    const [isHovered, setIsHovered] = useState(false);
    const { createDocument } = useManageDocument({ groupPermission });
    const lottieRef = useRef(null);

    const [play, setPlay] = useState<boolean>(false);
    const [direction, setDirection] = useState<AnimationDirection>(1);

    const handleOver = () => {
        setPlay(true);
        setDirection(1);
    };

    const handleOut = () => {
        setPlay(true);
        setDirection(-1);
    };

    const sendBannerdashAmplitudeEvent = (event: typeof AnalyticsEvent) => {
        analyticsClient.sendAnalyticsEvent(event, {}, [AnalyticsClientEnum.Amplitude, AnalyticsClientEnum.GA4]);
    };

    const onSubmit = () => {
        createDocument({ documentType: DocumentTypeEnum.CoverLetter });
        sendBannerdashAmplitudeEvent(AnalyticsEvent.ClickBannerdashCl);
    };

    return (
        <SimplePromotionalModule
            disabled={false}
            color={color}
            dataQa='dashboard-module-create-cover-letter'
            handleClick={onSubmit}
            isOut={handleOut}
            isOver={handleOver}
            setIsHovered={(isHovered: boolean) => setIsHovered(isHovered)}
            id='CreateCoverLetter'
            tabIndex={0}
        >
            <LeftColumn>
                {color === PMColorsEnum.BLUE ? (
                    <PrimaryChip>{translate('Recommended')}</PrimaryChip>
                ) : (
                    <TertiaryChip>{translate('Recommended')}</TertiaryChip>
                )}
                <CardTitle>{translate('Every resume needs a cover letter')}</CardTitle>
                <CardBody>{translate('Double your chances with a customized cover letter.')}</CardBody>
                <ActionButton isHovered={isHovered} handleClick={onSubmit}>
                    {translate('Create cover letter')}
                </ActionButton>
            </LeftColumn>
            <RightColumn className='right'>
                <ColumnContainer>
                    <Lottie
                        className='lottie1'
                        animationData={coverLetterLeft}
                        direction={direction}
                        loop={false}
                        play={play}
                        ref={lottieRef}
                        speed={2}
                    />
                    <AnimationContainer>
                        <Lottie
                            className='lottie2'
                            animationData={coverLetterRight}
                            direction={direction}
                            loop={false}
                            play={play}
                            ref={lottieRef}
                            speed={2}
                        />
                    </AnimationContainer>
                </ColumnContainer>
            </RightColumn>
        </SimplePromotionalModule>
    );
};
