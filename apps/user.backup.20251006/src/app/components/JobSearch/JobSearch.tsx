import translate from 'counterpart';
import React from 'react';

import { Routes } from '../../internals/router';
import JobSearchImage from './img/jobSearch.svg';
import { CheckerImage, Container, Cta, Label, Text, Title } from './styles';

const JobSearch = () => {
    const redirectToJobs = () => {
        window.location.href = Routes.jobs;
    };

    return (
        <Container>
            <CheckerImage src={JobSearchImage} />
            <div>
                <Label>{translate('Expert Tips')}</Label>
                <Title>{translate('Have you tried our job searching tool?')}</Title>
                <Text>
                    {translate(
                        'We connect you to the latest job opportunities from top companies. Be the first one to apply!',
                    )}
                </Text>
                <Cta data-qa='find-job' onClick={redirectToJobs}>
                    {translate('Find Me My Dream Job')}
                </Cta>
            </div>
        </Container>
    );
};

export default JobSearch;
