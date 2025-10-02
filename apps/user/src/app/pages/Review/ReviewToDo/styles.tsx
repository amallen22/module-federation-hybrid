import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    padding-top: 78px;
    border-left: auto;
    border-right: auto;
    box-sizing: border-box;
    gap: 48px;

    p {
        margin: 0;
        padding: 0;
    }

    @media only screen and (max-width: 890px) {
        padding: 32px 24px;
    }

    @media only screen and (max-width: 480px) {
        gap: 24px;
        padding: 32px 16px;
        padding-bottom: 0;
    }
`;

export const TextContainer = styled.div`
    height: 100%;
    width: 490px;

    @media only screen and (max-width: 480px) {
        width: 100%;
    }
`;

export const Title = styled.h1`
    ${dsmTypography.XLTitle}
    margin: 0;
    margin-bottom: 8px;

    @media only screen and (max-width: 480px) {
        ${dsmTypography.MTitle}
        text-align: center;
        margin-bottom: 16px;
    }
`;

export const Subtitle = styled.h2`
    margin: 0;
    ${dsmTypography.MBodyText};
    color: ${dsmColors.colorNeutral700};
    margin-bottom: 32px;

    @media only screen and (max-width: 480px) {
        ${dsmTypography.SBodyText}
        margin-bottom: 24px;
        line-height: 20px;
    }
`;

export const FeatureList = styled.ul`
    margin: 0;
    padding: 0;
`;

export const Feature = styled.li`
    display: flex;
    padding: 16px;
    gap: 16px;

    &:not(:last-child) {
        border-bottom: 2px solid ${dsmColors.colorNeutral300};
    }

    @media only screen and (max-width: 480px) {
        padding: 16px 0;
    }
`;

export const FeatureIcon = styled.img`
    height: 44px;
    width: 44px;
`;

export const FeatureSet = styled.article``;

export const FeatureTitle = styled.p`
    ${dsmTypography.STitle}
`;

export const FeatureText = styled.p`
    ${dsmTypography.MBodyText}
    color: ${dsmColors.colorNeutral700};

    @media only screen and (max-width: 480px) {
        ${dsmTypography.SBodyText}
        line-height: 20px;
    }
`;

export const ReviewWidget = styled.div`
    position: relative;
    width: 376px;
    margin-top: 16px;
    @media only screen and (max-width: 480px) {
        width: 100%;
    }
`;
