import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

const Wrapper = styled.div`
    width: 100%;
    max-width: 380px;
    ${breakpoint.screenL} {
        width: calc(33% - 8px);
    }
`;

const Title = styled.h4`
    ${dsmTypography.PrimaryFontFamily};
    ${dsmTypography.MTitle.styles};
    margin: 0 0 16px;
    color: ${dsmColors.colorNeutral900};
`;

const Button = styled.a`
    ${dsmTypography.PrimaryFontFamily};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 1.25px;
    text-align: center;
    text-transform: uppercase;
    padding: 16px 24px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-radius: 24px;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: ${dsmColors.colorPrimary400Base};
    border: 2px solid ${dsmColors.colorPrimary400Base};
`;

const ButtonUnsubscribe = styled.div`
    ${dsmTypography.PrimaryFontFamily};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 1.25px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: underline;
    box-sizing: border-box;
    cursor: pointer;
    color: ${dsmColors.colorNeutral400};
`;

export { Title, Wrapper, Button, ButtonUnsubscribe };
