import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

const JobsContainer = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    width: 100%;
    ${breakpoint.screenM} {
        max-width: 767px;
        margin: 32px auto 0;
    }
    ${breakpoint.screenXl} {
        max-width: 1200px;
    }
`;

const JobsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 24px;
    ${breakpoint.screenM} {
        justify-content: space-between;
    }
`;

const JobsLoadMore = styled.p`
    display: block;
    margin: 0 auto;
    ${PrimaryFontFamily};
    color: ${dsmColors.colorPrimary400Base};
    font-size: 16px;
    font-weight: bold;
    line-height: 1.25;
    cursor: pointer;
    text-align: center;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${PrimaryFontFamily};
    font-size: 12px;
    font-weight: 500;
    line-height: 1.67;
    letter-spacing: 1.5px;
    color: ${dsmColors.colorNeutral500};
    text-transform: uppercase;
    margin-bottom: 24px;
`;

const RecommendedJobs = styled.div`
    text-align: left;
`;

const JobsByIndeed = styled.div`
    text-align: right;
`;

export { JobsContainer, JobsWrapper, JobsLoadMore, InfoContainer, RecommendedJobs, JobsByIndeed };
