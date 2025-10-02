import translate from 'counterpart';
import React from 'react';

import { FeedReaderService } from '../../internals/feedReaderService/FeedReaderService';
import { HelpCards } from './HelpCards/HelpCards';
import { RecommendedReadings } from './RecommendedReadings/RecommendedReadings';
import { Container, FlexContainer, StyledTitle, Wrapper } from './styles';

const TipsAndReadings = () => {
    const feedReaderType = FeedReaderService.FEED_CV;
    const docFeed = new FeedReaderService({ feedType: feedReaderType }).read();

    return (
        <Wrapper data-qa='recommended-reading-box'>
            <Container>
                <StyledTitle>{translate('Your reading list')}</StyledTitle>
                <FlexContainer>
                    <RecommendedReadings feed={docFeed} />
                    <HelpCards />
                </FlexContainer>
            </Container>
        </Wrapper>
    );
};

export { TipsAndReadings };
