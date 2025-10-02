import translate from 'counterpart';
import React from 'react';

import { IndeedSearchResult, Job } from '../../../models/indeed';
import {
    EasyApply,
    JobCard,
    JobCompany,
    JobDate,
    JobLocation,
    JobTitle,
    LabelsContainer,
    NewJob,
    StyledArrow,
} from './styles';

interface Props {
    searchResult: IndeedSearchResult | undefined;
}

const JobCards = ({ searchResult }: Props) => {
    const isNewPost = (date: string) => {
        const todayTime = new Date().getTime();
        const postedTime = new Date(date).getTime();
        const dateDiff = Math.abs(postedTime - todayTime);
        const daysDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 7) {
            return true;
        }

        return false;
    };

    if (!searchResult || !searchResult.results) {
        return null;
    }

    return (
        <>
            {searchResult.results.map((job: Job, index: number) => {
                const {
                    refNum,
                    company,
                    jobtitle,
                    formattedLocationFull,
                    formattedRelativeTime,
                    indeedApply,
                    date,
                    url,
                } = job;
                return (
                    <JobCard data-qa={`job-card-${index}`} key={refNum} href={url} target='_blank'>
                        <JobCompany>{company}</JobCompany>
                        <JobTitle>{jobtitle}</JobTitle>
                        <JobLocation>{formattedLocationFull}</JobLocation>
                        <JobDate>{formattedRelativeTime}</JobDate>
                        <LabelsContainer>
                            {indeedApply ? <EasyApply>{translate('Easy apply')}</EasyApply> : null}
                            {isNewPost(date) ? <NewJob>{translate('New')}</NewJob> : null}
                        </LabelsContainer>
                        <StyledArrow />
                    </JobCard>
                );
            })}
        </>
    );
};

export { JobCards };
