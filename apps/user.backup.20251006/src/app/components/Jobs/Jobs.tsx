import translate from 'counterpart';
import React, { useState } from 'react';

import { JobSearchParams } from '../../models/indeed';
import { JobOffers } from './JobOffers/JobOffers';
import { JobsForm } from './JobsForm/JobsForm';
import { JobsContent, JobsContentWrapper, JobsHeader, JobsHeaderWrapper, JobsSubTitle, JobsTitle } from './styles';

const Jobs = () => {
    const [jobSearchParams, setJobSearchParams] = useState<JobSearchParams>({
        job: '',
        location: '',
    });

    return (
        <>
            <JobsHeaderWrapper>
                <JobsHeader>
                    <JobsTitle>{translate('Job search')}</JobsTitle>
                    <JobsSubTitle>
                        {translate('Find jobs that match your profile and send your job-winning resume')}
                    </JobsSubTitle>
                </JobsHeader>
            </JobsHeaderWrapper>
            <JobsContentWrapper>
                <JobsContent>
                    <JobsForm onSearchHandler={setJobSearchParams} />
                    <JobOffers jobSearchParams={jobSearchParams} />
                </JobsContent>
            </JobsContentWrapper>
        </>
    );
};

export { Jobs };
