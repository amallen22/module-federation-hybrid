import React from 'react';

import background from './img/background.svg';
import feature1 from './img/feature1.svg';
import feature2 from './img/feature2.svg';
import feature3 from './img/feature3.svg';
import feature4 from './img/feature4.svg';
import feature5 from './img/feature5.svg';
import { LoaderFeature } from './LoaderFeature/LoaderFeature';
import { Background, Container } from './styles';

const features = [
    {
        text: 'Checking marketability and clarity',
        icon: feature1,
    },
    {
        text: 'Analyzing achievements',
        icon: feature2,
    },
    {
        text: 'Assesing fit to desired job',
        icon: feature3,
    },
    {
        text: 'Evaluating content relevance',
        icon: feature4,
    },
    {
        text: 'Verifying formatting',
        icon: feature5,
    },
];

export const ReviewLoader = () => {
    return (
        <Container data-qa='review-pending-loader'>
            <Background src={background} />
            <LoaderFeature id={1} text={features[0].text} icon={features[0].icon} />
            <LoaderFeature id={2} text={features[1].text} icon={features[1].icon} />
            <LoaderFeature id={3} text={features[2].text} icon={features[2].icon} />
            <LoaderFeature id={4} text={features[3].text} icon={features[3].icon} />
            <LoaderFeature id={5} text={features[4].text} icon={features[4].icon} />
        </Container>
    );
};
