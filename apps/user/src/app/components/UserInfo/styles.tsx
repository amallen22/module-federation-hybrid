import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

import fonts from '../../styles/fonts';

const { breakpoint } = dsmBreakpoints;

export const FieldsPhotoWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    ${breakpoint.screenS} {
        justify-content: space-between;
    }
`;

export const SectionSubtitle = styled.p`
    font-family: ${fonts.primary};
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 1.5px;
    margin-bottom: 0;
    color: ${dsmColors.colorNeutral500};
    padding-bottom: 10px;
`;

export const Email = styled.p`
    margin-top: 0;
    font-size: 16px;
    font-weight: 500;
    color: ${dsmColors.colorNeutral900};
`;

export const StyledConfigurationOptionDiv = styled.div`
    margin-bottom: 40px;
`;

export const StyledProfileTitle = styled.div`
    font-size: 20px;
    font-family: ${fonts.primary};
    font-weight: 500;
    margin-bottom: 32px;
`;

interface Props {
    disabled: boolean;
}

export const SaveButton = styled.a<Props>`
    ${dsmTypography.PrimaryFontFamily};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 1.25px;
    text-align: center;
    text-transform: uppercase;
    padding: 10px 30px;
    box-sizing: border-box;
    border-radius: 24px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    display: block;
    text-decoration: none;
    background-color: ${dsmColors.colorNeutral00White};
    color: ${(props) => (props.disabled ? dsmColors.colorPrimary100 : dsmColors.colorPrimary400Base)};
    border: 2px solid ${(props) => (props.disabled ? dsmColors.colorPrimary100 : dsmColors.colorPrimary400Base)};
    width: max-content;
    margin-left: auto;
    margin-bottom: 24px;
`;
