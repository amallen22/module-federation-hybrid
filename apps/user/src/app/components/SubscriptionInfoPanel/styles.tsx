import styled from '@emotion/styled';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';
import { Link } from 'react-router-dom';

export const StyledWrapperContainer = styled.div`
    background-color: ${dsmColors.colorNeutral50};
    border: solid 2px ${dsmColors.colorNeutral200};
    border-radius: 4px;
    padding: 15px;
    font-family: Roboto;
    font-size: 16px;
    letter-spacing: 0;
    margin-bottom: 32px;

    @media (max-width: 992px) {
        position: relative;
    }
`;

export const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;

    @media (max-width: 992px) {
        padding: 0;
        flex-direction: column;
    }
`;

export const StyledCurrentPlanLabel = styled.div`
    text-transform: uppercase;
    color: ${dsmColors.colorNeutral500};
    margin-bottom: 8px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 1.5px;
`;

export const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1.5;
    color: ${dsmColors.colorNeutral500};
    & svg {
        margin-right: 5px;
    }
    text-transform: capitalize;
    &:not(:last-child) {
        margin-bottom: 8px;
    }

    @media (max-width: 992px) {
        display: inline-block;

        svg {
            display: none;
        }

        &[data-section='user-subscribed-date'] {
            display: none;
        }

        &:not(:last-child) {
            margin-bottom: 0;
        }
    }
`;

export const StyledWrapperDiv = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: auto;

    @media (max-width: 992px) {
        display: inline-block;
    }
`;

export const StyledCurrentPlanName = styled.div`
    font-weight: bold;
    margin-bottom: 16px;
`;

export const StyledLink = styled(Link)`
    font-weight: bold;
    line-height: 1.5;
    color: ${dsmColors.colorPrimary400Base};
    &:hover,
    &:visited,
    &:link {
        color: ${dsmColors.colorPrimary400Base};
    }
`;

export const StyledSpan = styled.span`
    margin-right: 5px;
    font-size: 14px;
    @media (max-width: 992px) {
        &:last-child {
            margin-right: 0;
        }
    }
`;

export const ImageWrapper = styled.div`
    @media (max-width: 992px) {
        position: absolute;
        right: 30px;
    }
`;

export const InfoWrapper = styled.div`
    @media (max-width: 992px) {
        font-size: 13px;
        display: flex;
        flex-direction: column;
        padding-bottom: 30px;
    }
`;
