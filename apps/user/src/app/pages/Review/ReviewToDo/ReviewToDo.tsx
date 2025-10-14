import translate from 'counterpart';
import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import { useDispatch } from 'react-redux';

import { ReviewCVPicker } from '../../../components/ReviewCVPicker/ReviewCVPicker';
import { getReviews } from '../../../internals/redux/documentReviewSlice';
import { useAppSelector } from '../../../internals/redux/hooks';
import { ReviewStatusEnum } from '../../../models/review';
import animationData from '../Assets/blue-dots-ia-animation.json';
import feature1 from '../Assets/feature1.svg';
import feature2 from '../Assets/feature2.svg';
import feature3 from '../Assets/feature3.svg';
import {
    Container,
    Feature,
    FeatureIcon,
    FeatureList,
    FeatureSet,
    FeatureText,
    FeatureTitle,
    LoaderAnimation,
    LoaderTitle,
    LoaderWrapper,
    ReviewWidget,
    Subtitle,
    TextContainer,
    Title
} from './styles';

export const ReviewToDo = () => {
    const dispatch = useDispatch();
    const { loadingResponse, reviewStatus } = useAppSelector((state) => state.documentReview);

    useEffect(() => {
        let interval: number | null = null;
        if (reviewStatus === ReviewStatusEnum.PENDING_REVIEW) {
            interval = window.setInterval(() => {
                dispatch(getReviews());
            }, 5000);
        }
        return () => {
            if (interval) window.clearInterval(interval);
        };
    }, [reviewStatus, dispatch]);

    const defaultOptions = {
        animationData,
        autoplay: true,
        loop: true,
        rendererSettings: {
            preserveAspectRatio: 'none',
        },
    };

    const ReviewLoader = () => {
        return (
            <LoaderWrapper data-qa='review-loader'>
                <LoaderTitle>{translate("Just a moment, we're preparing expert tips to improve your resume")}</LoaderTitle>
                <LoaderAnimation data-qa='user-loader'>
                    <Lottie options={defaultOptions} />
                </LoaderAnimation>
            </LoaderWrapper>
        );
    };
    
    return (
        <Container className='reviewToDo'>
            { loadingResponse
                ?
                <ReviewLoader />
                :
                <>
                    <TextContainer>
                        <Title>{translate('Maximize your chances with expert recommendations')}</Title>
                        <Subtitle>
                            {translate(
                                'Crafting a winning resume can be challenging. Our advice will help you identify improvement areas, so you can adapt your resume to your dream job.',
                            )}
                        </Subtitle>
                        <FeatureList>
                            <Feature>
                                <FeatureIcon src={feature1} />
                                <FeatureSet>
                                    <FeatureTitle>{translate('In-depth analysis')}</FeatureTitle>
                                    <FeatureText>
                                        {translate(
                                            'We will meticulously examine your resume ensuring it aligns perfectly with industry standards.',
                                        )}
                                    </FeatureText>
                                </FeatureSet>
                            </Feature>
                            <Feature>
                                <FeatureIcon src={feature2} />
                                <FeatureSet>
                                    <FeatureTitle>{translate('Tailored feedback')}</FeatureTitle>
                                    <FeatureText>
                                        {translate(
                                            'Receive personalized suggestions to help you highlight your strengths and address any weaknesses.',
                                        )}
                                    </FeatureText>
                                </FeatureSet>
                            </Feature>
                            <Feature>
                                <FeatureIcon src={feature3} />
                                <FeatureSet>
                                    <FeatureTitle>{translate('Professional insights')}</FeatureTitle>
                                    <FeatureText>
                                        {translate(
                                            'Understand exactly what employers are looking for in candidates, for your specific job title.',
                                        )}
                                    </FeatureText>
                                </FeatureSet>
                            </Feature>
                        </FeatureList>
                    </TextContainer>
                    <ReviewWidget>
                        <ReviewCVPicker />
                    </ReviewWidget>
                </>
            }
        </Container>
    );
};
