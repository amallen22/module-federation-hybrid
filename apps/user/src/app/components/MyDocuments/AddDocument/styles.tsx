import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

const AddNewDocument = styled.div`
    cursor: pointer;
    width: 256px;
    border-radius: 4px;
    border: 2px dashed ${dsmColors.colorNeutral300};
    ${PrimaryFontFamily};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 1.25px;
    text-align: center;
    text-transform: uppercase;
    color: ${dsmColors.colorPrimary400Base};
    display: flex;
    flex-flow: column;
    justify-self: center;
    justify-content: center;
    margin: 16px 20px;
    padding: 16px;
    box-sizing: border-box;
    transition: 0.2s all;
    ${breakpoint.screenS} {
        height: 362px;
    }
    ${breakpoint.screenL} {
        margin: 0 18px 40px;
    }
    &:hover {
        border: 2px dashed ${dsmColors.colorPrimary400Base};
    }
`;

const AddButton = styled.div`
    width: 56px;
    height: 56px;
    border: 2px dashed ${dsmColors.colorPrimary400Base};
    border-radius: 100%;
    align-self: center;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SpinnerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export { AddNewDocument, AddButton, SpinnerContainer };
