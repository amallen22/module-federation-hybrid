import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

const JobsHeaderWrapper = styled.div`
    background-color: ${dsmColors.colorNeutral50};
`;

const JobsHeader = styled.div`
    box-sizing: border-box;
    padding: 56px 16px;
    margin: 0 auto;
    width: 100%;
    ${breakpoint.screenM} {
        padding: 56px 32px;
        max-width: 767px;
    }
    ${breakpoint.screenXl} {
        max-width: 1200px;
    }
`;

const JobsTitle = styled.h2`
    margin: 0 0 18px;
    font-family: Roboto;
    font-size: 32px;
    font-weight: 500;
    line-height: 1.25;
    color: ${dsmColors.colorNeutral900};
    text-align: left;
    ${breakpoint.screenL} {
        text-align: center;
    }
    ${breakpoint.screenXl} {
        text-align: left;
    }
`;

const JobsSubTitle = styled.p`
    margin: 0;
    font-family: Roboto;
    font-size: 16px;
    line-height: 1.5;
    color: ${dsmColors.colorNeutral700};
    text-align: left;
    ${breakpoint.screenL} {
        text-align: center;
    }
    ${breakpoint.screenXl} {
        text-align: left;
    }
`;

const JobsContentWrapper = styled.div`
    background-color: ${dsmColors.colorNeutral200};
`;

const JobsContent = styled.div`
    box-sizing: border-box;
    padding: 16px 16px;
    margin: 0 auto;
    position: relative;
    width: 100%;
    min-height: 60vh;
    ${breakpoint.screenM} {
        padding: 0 32px 120px;
        max-width: 767px;
    }
    ${breakpoint.screenXl} {
        max-width: 1200px;
    }
`;

export { JobsHeaderWrapper, JobsHeader, JobsTitle, JobsSubTitle, JobsContentWrapper, JobsContent };
