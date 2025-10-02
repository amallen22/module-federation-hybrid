import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

const modalImageStyles = {
    width: '100%',
    height: '100%',
};

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    ${breakpoint.screenM} {
        justify-content: space-between;
    }
`;

const Container = styled(FlexContainer)`
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 2px solid ${dsmColors.colorNeutral100};
    ${breakpoint.screenM} {
        padding-bottom: 4px;
    }
`;

const ContentImage = styled.img`
    display: none;
    ${breakpoint.screenM} {
        display: block;
        width: 152px;
        height: auto;
    }
`;

const ContentWrapper = styled.div`
    width: 100%;
    ${breakpoint.screenM} {
        width: calc(100% - 180px);
    }
`;

const ModalSubtitle = styled.h4`
    ${dsmTypography.PrimaryFontFamily};
    ${dsmTypography.STitle.styles};
    margin: 0 0 16px;
    display: none;
    ${breakpoint.screenM} {
        display: block;
    }
`;

const ModalSubtitleMobile = styled.h4`
    ${dsmTypography.PrimaryFontFamily};
    ${dsmTypography.STitle.styles};
    margin: 0;
    display: block;
    ${breakpoint.screenM} {
        display: none;
    }
`;

const ContentList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin: 0;
    display: none;
    ${breakpoint.screenM} {
        display: block;
    }
`;

const ContentListItem = styled.li`
    ${dsmTypography.PrimaryFontFamily};
    ${dsmTypography.SBodyText.styles};
    color: ${dsmColors.colorNeutral800};
    padding-left: 20px;
    position: relative;
    &:not(:last-child) {
        margin-bottom: 20px;
    }
    &:before {
        content: '';
        width: 6px;
        height 6px;
        border-radius: 20px;
        position: absolute;
        left: 0;
        top: 7px;
        background-color: ${dsmColors.colorPrimary400Base};
    }
`;

const Button = styled.a`
    display: block;
    padding: 16px;
    text-transform: uppercase;
    text-decoration: none;
    ${dsmTypography.PrimaryFontFamily};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 1.25px;
    text-align: center;
    box-sizing: border-box;
    border-radius: 50px;
    width: 100%;
    &:not(:last-child) {
        margin-bottom: 24px;
    }
    ${breakpoint.screenM} {
        width: calc(50% - 12px);
        margin-bottom: 0;
        &:not(:last-child) {
            margin-bottom: 0;
        }
    }
`;

const ButtonBack = styled(Button)`
    border: 2px solid ${dsmColors.colorPrimary400Base};
    color: ${dsmColors.colorPrimary400Base};
`;

const ButtonUnsubscribe = styled(Button)`
    color: ${dsmColors.colorNeutral00White};
    background-color: ${dsmColors.colorPrimary400Base};
    border: 2px solid ${dsmColors.colorPrimary400Base};
    cursor: pointer;
`;

export {
    modalImageStyles,
    FlexContainer,
    Container,
    ContentImage,
    ContentWrapper,
    ModalSubtitle,
    ModalSubtitleMobile,
    ContentList,
    ContentListItem,
    ButtonBack,
    ButtonUnsubscribe,
};
