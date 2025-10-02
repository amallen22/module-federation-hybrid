import { analyticsClient, AnalyticsClientEnum, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import translate from 'counterpart';
import { AnimationDirection } from 'lottie-web';
import React, { useRef, useState } from 'react';
import Lottie from 'react-lottie-player';

import useManageDocument from '../../../hooks/useManageDocument';
import useProfile from '../../../hooks/useProfile';
import { fetchDocuments } from '../../../internals/redux/documentSlice';
import { useAppDispatch } from '../../../internals/redux/hooks';
import { Document, DocumentTypeEnum } from '../../../models/documents';
import { ActionButton } from '../ActionButton/ActionButton';
import onlineCv from '../Assets/onlineCv.json';
import { PMColorsEnum } from '../Definitions';
import { SimplePromotionalModule } from '../SimplePromotionalModule';
import { CardBody, CardTitle, LeftColumn, RightColumn, SecondaryChip } from '../styles';
import { AnimationContainer } from './styles';
interface Props {
    document: Document;
}

export const OnlineCVPM = ({ document }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const { groupPermission } = useProfile();
    const { openOnlineDocument } = useManageDocument({ groupPermission });
    const documentDispatch = useAppDispatch();
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
        sendBannerdashAmplitudeEvent(AnalyticsEvent.ClickBannerdashShare);
        openOnlineDocument({
            document: document,
            callback: () => documentDispatch(fetchDocuments({ limit: 3, documentType: DocumentTypeEnum.Resume })),
        });
    };

    return (
        <SimplePromotionalModule
            disabled={false}
            color={PMColorsEnum.LIGHT_BLUE}
            dataQa='dashboard-module-online-resume'
            handleClick={onSubmit}
            isOut={handleOut}
            isOver={handleOver}
            setIsHovered={(isHovered: boolean) => setIsHovered(isHovered)}
            id='CheckOutOnlineResume'
            tabIndex={0}
        >
            <LeftColumn>
                <SecondaryChip>{translate('Essential')}</SecondaryChip>
                <CardTitle>{translate('Discover your online resume')}</CardTitle>
                <CardBody>
                    {translate('Copy and paste a unique URL for easy sharing and keep track of views.')}
                </CardBody>
                <ActionButton isHovered={isHovered} handleClick={onSubmit}>
                    {translate('View my online resume')}
                </ActionButton>
            </LeftColumn>
            <RightColumn className='right'>
                <AnimationContainer>
                    <Lottie
                        className='lottie1'
                        animationData={onlineCv}
                        direction={direction}
                        loop={false}
                        play={play}
                        ref={lottieRef}
                        speed={2}
                    />
                </AnimationContainer>
            </RightColumn>
        </SimplePromotionalModule>
    );
};
