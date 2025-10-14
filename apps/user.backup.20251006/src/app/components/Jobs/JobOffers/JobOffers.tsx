import { Spinner } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useEffect, useState } from 'react';

import { getCookie } from '../../../helpers/getCookie';
import { IndeedSearchResult, JobSearchParams } from '../../../models/indeed';
import { apiService } from '../../../services/ApiService';
import { FrontLogService } from '../../../services/FrontLogService';
import { SpinnerContainer } from '../../MyDocuments/AddDocument/styles';
import { JobCards } from '../JobCards/JobCards';
import IndeedLogo from './img/indeed-logo.svg';
import { InfoContainer, JobsByIndeed, JobsContainer, JobsLoadMore, JobsWrapper, RecommendedJobs } from './styles';

interface Props {
    jobSearchParams: JobSearchParams;
}

const RESULTS_PER_PAGE = 6;

const JobOffers = ({ jobSearchParams }: Props) => {
    const [loading, setLoading] = useState(true);
    const [searchResult, setSearchResult] = useState<IndeedSearchResult>();
    const [isLoadMore, setIsLoadMore] = useState(false);

    useEffect(() => {
        getJobs({ loadMore: false });
    }, [jobSearchParams]);

    const setSearchParams = (loadMore: boolean) => {
        const currentLocation = jobSearchParams.location || '';
        const currentJobQuery = jobSearchParams.job || '*';
        const country: string = getCookie().country;

        const SearchParams = {
            l: currentLocation,
            co: country,
            q: currentJobQuery,
            start: loadMore ? searchResult?.end : 0,
            limit: RESULTS_PER_PAGE,
        };

        return SearchParams;
    };

    const getJobs = ({ loadMore }: { loadMore: boolean }) => {
        setLoading(true);
        setIsLoadMore(loadMore);

        const currentResults = loadMore ? searchResult?.results : [];

        const IndeedSearchParams = setSearchParams(loadMore);

        apiService
        .getJobsIndeed(IndeedSearchParams)
        .then((res) => {
            if (loadMore && res.results) {
                res.results = currentResults?.concat(res.results);
            }
            setSearchResult(res);
            setLoading(false);
        })
        .catch((err) => {
            FrontLogService.logAjaxResponse({
                className: 'JobSearch',
                funcName: 'getJobs',
                err,
            });
        });
    };

    const handleLoadMore = () => {
        getJobs({ loadMore: true });
    };

    const renderLoadMore = () => {
        if (searchResult?.totalResults === 0) {
            return null;
        }

        return (
            <JobsLoadMore onClick={handleLoadMore} data-qa='see-more-jobs-button'>
                {translate('See more jobs...')}
            </JobsLoadMore>
        );
    };

    if (loading && !isLoadMore) {
        return (
            <SpinnerContainer>
                <Spinner color='neutral' />
            </SpinnerContainer>
        );
    }

    return (
        <JobsContainer>
            <InfoContainer>
                <RecommendedJobs>
                    {translate('%(count)s Results', {
                        count: searchResult?.totalResults || 0,
                    })}
                </RecommendedJobs>
                <JobsByIndeed>
                    <img src={IndeedLogo} />
                </JobsByIndeed>
            </InfoContainer>
            <JobsWrapper>
                <JobCards searchResult={searchResult} />
            </JobsWrapper>
            {loading ? (
                <SpinnerContainer>
                    <Spinner color='blue' />
                </SpinnerContainer>
            ) : (
                renderLoadMore()
            )}
        </JobsContainer>
    );
};

export { JobOffers };
