import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

const MyDocumentsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${breakpoint.screenL} {
        justify-content: flex-start;
    }
`;

const ButtonWrapper = styled.div`
    height: 50px;
`;

const ViewAllContainer = styled.div`
    text-align: center;
    ${PrimaryFontFamily};
    font-size: 16px;
    font-weight: bold;
    line-height: 1.25;
    color: ${dsmColors.colorPrimary400Base};
    margin-top: 16px;
    cursor: pointer;
    margin-bottom: 8px;
`;

const ContainerWrapper = styled.div`
    min-height: 460px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export { MyDocumentsWrapper, ViewAllContainer, ButtonWrapper, ContainerWrapper };
