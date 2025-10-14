import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

const CardsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 32px;
    ${breakpoint.screenM} {
        margin-top: 64px;
    }
`;

interface Props {
    popular: boolean;
}

const CardWrapper = styled.div`
    width: 100%;
    max-width: 380px;
    ${breakpoint.screenM} {
        width: calc(100% / 3 - 16px);
        margin: 0 8px;
        margin-bottom: 0;
    }
`;

const Card = styled.div<Props>`
    ${dsmTypography.PrimaryFontFamily};
    display: flex;
    flex-direction: column;
    padding: 16px;
    margin-bottom: 32px;
    border-radius: 4px;
    box-shadow: 0 1px 4px 0 ${dsmColors.colorNeutral400}, 0 3px 8px 0 ${dsmColors.colorNeutral200};
    background-color: ${dsmColors.colorNeutral00White};
    box-sizing: border-box;
    border-top: 6px solid ${(props) => (props.popular ? dsmColors.colorPrimary400Base : dsmColors.colorPrimary100)};
    position: relative;
    transition: 0.2s;
    &:hover {
        box-shadow: 0 3px 8px 0 rgba(181, 186, 189, 0.75);
    }
    ${breakpoint.screenL} {
        padding: 24px;
        margin-bottom: 16px;
    }
`;

const CardPopular = styled.div`
    background-color: ${dsmColors.colorPrimary400Base};
    padding: 6px 16px;
    position: absolute;
    top: -20px;
    right: 24px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.67;
    letter-spacing: 1.5px;
    text-align: center;
    color: ${dsmColors.colorNeutral00White};
    text-transform: uppercase;
`;

const CardTitle = styled.div`
    ${dsmTypography.LTitle.styles};
    color: ${dsmColors.colorNeutral900};
    font-weight: normal;
    margin: 16px 0;
    padding-bottom: 16px;
    border-bottom: 2px solid ${dsmColors.colorNeutral200};
    span {
        font-weight: 700;
        display: block;
    }
`;

const CardText = styled.p`
    margin: 0 0 28px;
    font-size: 14px;
    line-height: 1.43;
    color: ${dsmColors.colorNeutral700};
`;

interface ButtonProps {
    popular: boolean;
}

const CardButton = styled.div<ButtonProps>`
    cursor: pointer;
    padding: 16px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 1.25px;
    text-align: center;
    text-transform: uppercase;
    color: ${(props) => (props.popular ? dsmColors.colorNeutral00White : dsmColors.colorPrimary400Base)};
    background-color: ${(props) => (props.popular ? dsmColors.colorPrimary400Base : dsmColors.colorNeutral00White)};
    border: 2px solid ${dsmColors.colorPrimary400Base};
`;

const Disclaimer = styled.div`
    ${dsmTypography.PrimaryFontFamily};
    font-size: 12px;
    line-height: 1.33;
    letter-spacing: 0.4px;
    color: ${dsmColors.colorNeutral700};
    padding-left: 16px;
    margin: 16px 0 32px;
    ${breakpoint.screenM} {
        margin: 16px 0 56px;
    }
`;

const CardIcon = styled.img`
    width: 64px;
    height: 64px;
`;

export { CardsContainer, Card, CardWrapper, CardTitle, CardText, CardButton, Disclaimer, CardPopular, CardIcon };
