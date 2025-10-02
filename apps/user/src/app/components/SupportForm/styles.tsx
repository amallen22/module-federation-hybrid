import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily, MTitle, STitle, MBodyText, SBodyText } = dsmTypography;

const { breakpoint } = dsmBreakpoints;

export const Container = styled.div`
    ${PrimaryFontFamily};
    background-color: ${dsmColors.colorNeutral00White};
    padding: 16px;
    margin-top: 32px;
    ${breakpoint.screenM} {
        padding: 40px 60px;
        margin-top: 48px;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const FormColumn = styled.div`
    width: 100%;
    margin-bottom: 36px;
    ${breakpoint.screenM} {
        width: calc(50% - 36px);
        margin-bottom: 0;
    }
`;

export const Title = styled.h3`
    ${MTitle};
    margin: 0 0 16px;
`;

export const Input = styled.input`
    ${PrimaryFontFamily};
    ${MBodyText};
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
    border-radius: 4px;
    background-color: ${dsmColors.colorNeutral100};
    border: none;
    &:not(:last-child) {
        margin-bottom: 24px;
    }
    &::placeholder {
        ${STitle};
        color: #b8b8b8;
    }
`;

export const Textarea = styled.textarea`
    ${PrimaryFontFamily};
    ${MBodyText};
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
    border-radius: 4px;
    background-color: ${dsmColors.colorNeutral100};
    border: none;
    resize: none;
    &::placeholder {
        ${STitle};
        color: #b8b8b8;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ${breakpoint.screenM} {
        margin-top: 36px;
    }
`;

export const Warning = styled.div`
    color: ${dsmColors.colorSecondary500};
    ${SBodyText};
    font-weight: 700;
    letter-spacing: 0.47px;
    text-align: center;
    margin-bottom: 24px;
    max-width: 312px;
`;

export const Success = styled.div`
    box-sizing: border-box;
    max-width: 450px;
    padding: 16px;
    border: 1px solid ${dsmColors.colorSuccess500Base};
    border-left: 3px solid ${dsmColors.colorSuccess500Base};
    background-color: ${dsmColors.colorSuccess50};
    border-radius: 4px;
    ${SBodyText};
    color: ${dsmColors.colorSuccess900Text};
    margin: 0 auto;
`;
