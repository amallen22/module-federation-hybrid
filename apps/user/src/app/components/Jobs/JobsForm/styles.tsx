import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

const FormContainer = styled.div`
    transform: translateY(-40px);
    ${breakpoint.screenM} {
        transform: translateY(-32px);
        position: relative;
        box-sizing: border-box;
        background-color: ${dsmColors.colorNeutral00White};
        height: 64px;
        min-width: 200px;
        padding: 12px 8px 12px 24px;
        border-radius: 32px;
        box-shadow: 0 1px 4px 0 ${dsmColors.colorNeutral400}, 0 3px 8px 0 ${dsmColors.colorNeutral200};
        display: flex;
        align-items: center;
        max-width: 749px;
    }
`;

const FormButton = styled.button`
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
    border-radius: 50px;
    background-color: ${dsmColors.colorPrimary400Base};
    color: ${dsmColors.colorNeutral00White};
    display: flex;
    align-items: center;
    justify-content: center;
    ${breakpoint.screenM} {
        height: 40px;
        padding: 10px;
        width: 48px;
        height: 48px;
        position: absolute;
        right: 8px;
        top: 8px;
    }
`;

const InputLabel = styled.label`
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: ${dsmColors.colorNeutral900};
    margin: 0 8px 0 12px;
    ${breakpoint.screenM} {
        margin: 8px;
    }
`;

const Input = styled.input`
    border: none;
    outline: none;
    width: 100%;
`;

const InputContainer = styled.div`
    ${PrimaryFontFamily};
    display: flex;
    align-items: center;
    padding: 12px;
    background-color: ${dsmColors.colorNeutral00White};
    border-radius: 32px;
    box-shadow: 0 1px 4px 0 ${dsmColors.colorNeutral400}, 0 3px 8px 0 ${dsmColors.colorNeutral200};
    margin-bottom: 16px;
    ${breakpoint.screenM} {
        background-color: transparent;
        border-radius: 0;
        box-shadow: none;
        margin-bottom: 0;
        padding: 0;
        width: calc((100% / 2) - 52px);
        &:first-child {
            padding: 0 16px 0 0;
            margin-right: 16px;
            border-right: 2px solid ${dsmColors.colorNeutral300};
        }
    }
`;

export { FormContainer, FormButton, InputContainer, InputLabel, Input };
