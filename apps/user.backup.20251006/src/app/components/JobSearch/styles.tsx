import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

export const Container = styled.div`
    ${PrimaryFontFamily};
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 380px;
    margin-top: 24px;
    ${breakpoint.screenL} {
        margin-top: 0;
        flex-wrap: nowrap;
        max-width: 620px;
    }
`;

export const CheckerImage = styled.img`
    width: 181px;
    height: 198px;
    margin: 0 auto 16px;
    ${breakpoint.screenL} {
        margin: 0 24px 0 0;
    }
`;

export const Label = styled.div`
    padding: 6px 16px;
    border-radius: 24px;
    background-color: #daeffd;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.67;
    letter-spacing: 1.5px;
    color: ${dsmColors.colorPrimary400Base};
    text-transform: uppercase;
    display: table;
    margin-bottom: 8px;
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    line-height: 1.4;
    color: ${dsmColors.colorNeutral900};
    margin-bottom: 8px;
`;

export const Text = styled.p`
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    color: ${dsmColors.colorNeutral900};
    margin: 0 0 12px;
`;

export const Cta = styled.div`
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    text-decoration: underline;
    text-transform: uppercase;
    color: ${dsmColors.colorPrimary400Base};
    cursor: pointer;
`;
