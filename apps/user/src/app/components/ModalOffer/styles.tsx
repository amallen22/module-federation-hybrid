import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const modalImageStyles = {
    width: '100%',
    height: '100%',
};

interface Props {
    loading: boolean;
}

const ContentWrapper = styled.div<Props>`
    display: flex;
    align-items: center;
    opacity: ${(props) => (props.loading ? '.4' : '1')};
`;

const Content = styled.p`
    ${dsmTypography.PrimaryFontFamily};
    color: ${dsmColors.colorNeutral900};
    margin: 0 0 4px;
    font-size: 16px;
    line-height: 1.5;
`;

const ContentTitle = styled.h4`
    ${dsmTypography.PrimaryFontFamily};
    ${dsmTypography.STitle.styles};
    color: ${dsmColors.colorNeutral900};
    margin: 0 0 4px;
`;

const ContentText = styled.p`
    ${dsmTypography.PrimaryFontFamily};
    ${dsmTypography.SBodyText.styles};
    color: ${dsmColors.colorNeutral500};
    margin: 0 0 16px;
    line-height: 20px;
`;

const ContentImage = styled.img`
    margin-right: 24px;
`;

const Button = styled.div<Props>`
    padding: 16px 32px;
    text-transform: uppercase;
    text-decoration: none;
    ${dsmTypography.PrimaryFontFamily};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 1.25px;
    text-align: center;
    box-sizing: border-box;
    border-radius: 50px;
    margin: 0 auto;
    color: ${dsmColors.colorNeutral00White};
    background-color: ${dsmColors.colorPrimary400Base};
    max-width: fit-content;
    cursor: ${(props) => (props.loading ? 'not-allowed' : 'pointer')};
    pointer-events: ${(props) => (props.loading ? 'none' : 'all')};
    opacity: ${(props) => (props.loading ? '.4' : '1')};
`;

const CaptionText = styled.p`
    ${dsmTypography.PrimaryFontFamily};
    font-size: 12px;
    line-height: 1.33;
    letter-spacing: 0.4px;
    color: ${dsmColors.colorNeutral500};
    margin: 0;
`;

export { modalImageStyles, ContentWrapper, Content, ContentTitle, ContentText, ContentImage, Button, CaptionText };
