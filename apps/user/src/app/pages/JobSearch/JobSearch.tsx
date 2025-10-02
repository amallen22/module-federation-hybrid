import React from 'react';

import { Footer } from '../../components/Footer/Footer';
import { Jobs } from '../../components/Jobs/Jobs';
import { PageWrapper } from './styles';
const JobSearch = () => {
    return (
        <PageWrapper data-qa='job-page-container'>
            <Jobs />
            <Footer />
        </PageWrapper>
    );
};

export { JobSearch };
