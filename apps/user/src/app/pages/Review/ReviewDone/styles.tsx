import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

export const ContainerTop = styled.div`
    padding-top: 88px;
    padding-bottom: 24px;
    width: 100%;
    display: grid;
    grid-template-columns: 514px 48px 339px;
    justify-content: center;
    box-sizing: border-box;
    background: ${dsmColors.colorNeutral200};

    @media only screen and (max-width: 880px) {
        align-items: center;
        display: block;
        padding-bottom: 210px;
        margin: auto;
        width: 100%;
        #subtitle {
            display: none;
        }
    }

    @media only screen and (max-width: 480px) {
        padding-bottom: 200px;
        padding-top: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const TopTextContainer = styled.div`
    @media only screen and (max-width: 880px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    @media only screen and (max-width: 480px) {
        align-items: flex-start;
        width: 90%;
    }
`;

export const ContainerBottom = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 490px 48px 339px;
    justify-content: center;
    #subtitle {
        display: none;
    }

    @media only screen and (max-width: 880px) {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 80%;
        #subtitle {
            display: block;
        }
    }

    @media only screen and (max-width: 480px) {
        width: 90%;
    }
`;

export const CvPreview = styled.section`
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 88px;
    grid-column-start: 3;
    margin-top: -184px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 4px 0px #d9dde0;
    overflow: hidden;
    border-radius: 4px 4px 24px 24px;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        height: 184px;
        width: 100%;
        background-image: linear-gradient(0deg, rgb(0 0 0 / 8%) 0%, rgb(0 0 0 / 4%) 2%, rgb(0 98 255 / 0%) 50%);
    }
    @media only screen and (max-width: 880px) {
        order: 1;
        top: auto;
        position: relative;
        margin-bottom: 24px;
    }
`;

export const CvPreviewTop = styled.img`
    height: 184px;
    width: 339px;
    object-fit: cover;
    object-position: 50% 0;

    @media only screen and (max-width: 480px) {
        width: 328px;
        height: 178px;
    }
`;

export const CvPreviewBottom = styled.div`
    width: 339px;
    background: white;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 480px) {
        width: 328px;
        height: 178px;
    }
`;

export const BottomTextContainer = styled.div`
    width: 100%;
    @media only screen and (max-width: 880px) {
        order: 2;
    }
`;

export const Title = styled.h1`
    ${dsmTypography.XLTitle}
    margin: 0;
    margin-bottom: 8px;
    display: flex;
    gap: 8px;
    @media only screen and (max-width: 880px) {
        text-align: center;
    }
    @media only screen and (max-width: 480px) {
        ${dsmTypography.MTitle}
        font-size: 24px;
    }

    @media only screen and (min-width: 480px) {
        span {
        position: relative;
        z-index: 3;
        display: flex;
        width: fit-content;
        justify-content: center;
        &:before {
            content: '';
            position: absolute;
            height: 50%;
            width: 110%;
            bottom: 0;
            border-radius: 10px;
            opacity: 40%;
            background: rgb(38 196 244);
            z-index: 1;
            mix-blend-mode: color-burn;
        }
    }
}
`;

export const Subtitle = styled.h2`
    margin: 0;
    color: ${dsmColors.colorNeutral700};
    font-size: 20px;
    font-weight: 400;
    line-height: 32px;
    text-align: left;

    @media only screen and (max-width: 480px) {
        display: none !important;
    }
`;

export const ReviewList = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    padding-bottom: 64px;

    @media only screen and (max-width: 480px) {
        margin-top: 12px;
        padding-bottom: 32px;
    }
`;

export const ReviewPoint = styled.li`
    display: flex;
    gap: 6px;
    margin-top: 24px;

    &:first-child {
        margin-top: 0;
    }

    @media only screen and (max-width: 480px) {
        &:not(:last-child) {
            border-bottom: 2px solid ${dsmColors.colorNeutral300};  
        }
        
    }

    @media only screen and (min-width: 481px) {
        &:not(:last-child) {
            div {
                border-bottom: 2px solid ${dsmColors.colorNeutral300};
            }   
        }
    }
`;

export const ReviewPointIcon = styled.img`
    height: 7px;
    width: 7px;
    padding: 10px;

    @media only screen and (max-width: 480px) {
        padding-left: 0;
    }
`;

export const ReviewSet = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px; 
    padding-bottom: 24px;
`;

export const ExampleList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 16px;
    list-style: disc;
    padding-left: 20px;
`;


export const ExampleListItem = styled.li`
    color: ${dsmColors.colorNeutral700};
    text-transform: capitalize;
    line-height: 24px;
    padding-left: 2px;
    ${dsmTypography.MBodyText};

    @media only screen and (max-width: 480px) {
        font-size: 14px;
        line-height: 20px;
    }
`;


export const ReviewTitle = styled.p`
    margin: 0;
    ${dsmTypography.STitle}
    font-size: 20px;
    line-height: 28px;

    @media only screen and (max-width: 480px) {
        font-size: 16px;
        line-height: 24px;
    }
`;

export const ReviewText = styled.p`
    margin: 0;
    ${dsmTypography.MBodyText}
    color: ${dsmColors.colorNeutral700};
    text-align: justify;

    @media only screen and (max-width: 480px) {
        ${dsmTypography.SBodyText}
        line-height: 20px;
    }
`;

export const ReviewExample = styled.p`
    margin: 0;
    ${dsmTypography.STitle}
    font-weight: 500;
    color: ${dsmColors.colorNeutral900};
    text-transform: capitalize;

    @media only screen and (max-width: 480px) {
        font-size: 14px;
        line-height: 20px;
    }
`;

export const Footer = styled.li`
    display: flex;
    gap: 16px;
    padding: 38px 0;

    @media only screen and (max-width: 480px) {
        height: 60px;
        padding-bottom: 16px;
    }
`;

export const FooterTitle = styled.p`
    margin: 0;
    ${dsmTypography.STitle}
    font-size: 16px;
`;

export const FooterText = styled.p`
    margin: 0;
    ${dsmTypography.MBodyText}
    color: ${dsmColors.colorNeutral700};
    font-size: 14.26px;

    &.mobile {
        display: none;
        @media only screen and (max-width: 880px) {
            display: block;
            margin-bottom: 32px;
        }
    }

    &.desktop {
        display: block;
        @media only screen and (max-width: 880px) {
            display: none;
        }
    }
`;

export const ChartImg = styled.img`
    height: 104px;
    width: 126px;
    @media only screen and (max-width: 480px) {
        height: 60px;
        width: 72px;
    }
`;

interface Props {
    disabled?: boolean;
}

export const EditResumeButton = styled.button<Props>`
    width: 100%;
    height: 56px;
    color: white;
    text-transform: uppercase;
    background: linear-gradient(29.84deg, #26a0f4 6.45%, #d800ff 126.05%);
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    display: none;
    transition: all 0.2s;

    &.desktop {
        @media only screen and (min-width: 880px) {
            display: block;
        }
    }

    &.mobile {
        @media only screen and (max-width: 880px) {
            display: block;
        }
    }

    ${(props) =>
        props.disabled
            ? `
        background: ${dsmColors.colorNeutral400};
    `
            : `
        cursor: pointer;
        &:hover,
        &:focus-visible {
            filter: brightness(1.2);
        }
        
        &:focus-visible {
            outline: 2px black solid; 
            outline-offset: -2px;
        }
    `}
`;

export const WidgetTitle = styled.p`
    padding: 0;
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: ${dsmColors.colorNeutral700};
    text-transform: uppercase;
`;

export const WidgetContent = styled.p`
    padding: 0;
    margin: 0;
    ${dsmTypography.STitle}
`;

export const WidgetContentSmall = styled.p`
    padding: 0;
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: ${dsmColors.colorNeutral700};
`;

export const WidgetItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 18px 0;
    margin: 0 24px;
    box-sizing: border-box;
    &:first-child {
        border-bottom: 2px solid ${dsmColors.colorNeutral200};
    }
`;
