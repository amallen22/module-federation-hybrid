import { InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React from 'react';

import useLanguages from '../../hooks/useLanguages';
import useProfile from '../../hooks/useProfile';
import { Footer } from '../Footer/Footer';
import { HelpCard } from '../HelpCard/HelpCard';
import SupportForm from '../SupportForm/SupportForm';
import { UnsubscribeButtons } from '../UnsubscribeButtons/UnsubscribeButtons';
import Image from './img/support.svg';
import {
    Container,
    Divider,
    FlexContainer,
    FlexContainerBottom,
    Headline,
    Subtitle,
    SupportImage,
    Title,
    Wrapper,
} from './styles';

const Support = () => {
    const { loadingProfile, firstName, lastName, email } = useProfile();
    const { languagesLoaded } = useLanguages();

    if (loadingProfile || !languagesLoaded) {
        return (
            <div className='cv-initial-loading'>
                <InitialLoading />
            </div>
        );
    }

    return (
        <>
            <Wrapper>
                <Container>
                    <FlexContainer>
                        <Headline>
                            <Title>{translate("Oh, snap! We're sorry you’ve experienced technical issues :(")}</Title>
                            <Subtitle>
                                {translate(
                                    "We're here to help! Please describe the problem you’re experiencing and we'll get back to you as soon as possible.",
                                )}
                            </Subtitle>
                        </Headline>
                        <SupportImage src={Image} />
                    </FlexContainer>
                    <SupportForm firstName={firstName} lastName={lastName} email={email} />
                    <FlexContainerBottom>
                        <UnsubscribeButtons />
                        <Divider />
                        <HelpCard />
                    </FlexContainerBottom>
                </Container>
            </Wrapper>
            <Footer />
        </>
    );
};

export default Support;
