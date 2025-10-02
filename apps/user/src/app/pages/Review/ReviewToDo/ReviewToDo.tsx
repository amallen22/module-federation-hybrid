import translate from 'counterpart';
import React from 'react';

import { ReviewCVPicker } from '../../../components/ReviewCVPicker/ReviewCVPicker';
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
    ReviewWidget,
    Subtitle,
    TextContainer,
    Title,
} from './styles';

export const ReviewToDo = () => {
    return (
        <Container className='reviewToDo'>
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
        </Container>
    );
};
