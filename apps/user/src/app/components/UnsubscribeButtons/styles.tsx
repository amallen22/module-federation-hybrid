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

const ButtonUnsubscribe = styled.div`
    ${dsmTypography.PrimaryFontFamily};
    color: var(--base-neutral-aux-default, #b5b8ba);
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.2px;
    text-decoration-line: underline;
    text-underline-position: from-font;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    margin-top: 16px;
`;

export { Title, Wrapper, ButtonUnsubscribe };
