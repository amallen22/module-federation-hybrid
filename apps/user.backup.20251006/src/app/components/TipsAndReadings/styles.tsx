import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

const Wrapper = styled.div`
    background-color: ${dsmColors.colorNeutral200};
    padding: 36px 0;
    ${breakpoint.screenS} {
        padding: 72px 32px;
    }
`;

const Container = styled.div`
    margin: 0 auto;
    max-width: 1180px;
`;

const StyledTitle = styled.h3`
    ${PrimaryFontFamily};
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.2px;
    margin-bottom: 56px;
    color: ${dsmColors.colorNeutral900};
    padding: 0 16px;
    ${breakpoint.screenS} {
        padding: 0;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    ${breakpoint.screenL} {
        flex-wrap: nowrap;
    }
`;

export { Wrapper, Container, StyledTitle, FlexContainer };
