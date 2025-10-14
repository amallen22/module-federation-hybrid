import styled from '@emotion/styled';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

import IconLocation from './img/icon-location.svg';
import IconTime from './img/icon-time.svg';

const { PrimaryFontFamily } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

const JobCard = styled.a`
    display: block;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    cursor: pointer;
    padding: 24px;
    border-radius: 4px;
    box-shadow: 0 1px 4px 0 ${dsmColors.colorNeutral400}, 0 3px 8px 0 ${dsmColors.colorNeutral200};
    background-color: ${dsmColors.colorNeutral00White};
    ${PrimaryFontFamily};
    margin: 0 0 24px;
    transition: 0.3s all;
    &:hover {
        box-shadow: 0 3px 8px 0 rgba(181, 186, 189, 0.75);
    }
    ${breakpoint.screenM} {
        width: calc(50% - 12px);
        margin: 0 0 24px;
    }
    ${breakpoint.screenXl} {
        width: calc(33% - 12px);
    }
`;

const JobCompany = styled.p`
    margin: 0 0 8px 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 1.5px;
    color: ${dsmColors.colorPrimary400Base};
    text-transform: uppercase;
`;

const JobTitle = styled.h3`
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.4;
    color: ${dsmColors.colorNeutral900};
`;

const JobInfo = styled.div`
    padding-left: 28px;
    font-size: 12px;
    line-height: 1.33;
    letter-spacing: 0.4px;
    color: ${dsmColors.colorNeutral700};
    position: relative;
    &:before {
        content: '';
        width: 24px;
        height: 24px;
        position: absolute;
        left: 0;
        top: -6px;
        background-size: contain;
        background-position: center;
    }
`;

const JobLocation = styled(JobInfo)`
    margin: 12px 0;
    &:before {
        background-image: url(${IconLocation});
    }
`;

const JobDate = styled(JobInfo)`
    margin: 12px 0 36px;
    &:before {
        background-image: url(${IconTime});
    }
`;

const JobLabel = styled.div`
    display: inline-block;
    padding: 2px 12px;
    border-radius: 24px;
    font-size: 11px;
    font-weight: bold;
    line-height: 1.82;
    letter-spacing: 1.38px;
    text-transform: uppercase;
`;

const EasyApply = styled(JobLabel)`
    border: solid 1px ${dsmColors.colorPrimary400Base};
    color: ${dsmColors.colorPrimary400Base};
    margin-right: 16px;
`;

const NewJob = styled(JobLabel)`
    background-color: ${dsmColors.colorPrimary400Base};
    color: ${dsmColors.colorNeutral00White};
`;

const LabelsContainer = styled.div`
    position: absolute;
    left: 24px;
    bottom: 24px;
`;

const StyledArrow = styled(ArrowForwardRoundedIcon)`
    color: ${dsmColors.colorPrimary400Base};
    position: absolute;
    right: 24px;
    bottom: 24px;
`;

export { JobCard, JobCompany, JobTitle, JobLocation, JobDate, EasyApply, LabelsContainer, NewJob, StyledArrow };
