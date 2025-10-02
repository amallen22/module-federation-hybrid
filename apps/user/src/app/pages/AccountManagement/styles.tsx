import styled from '@emotion/styled';
import { MenuItem, Select } from '@mui/material';
import { dsmBreakpoints, dsmColors, dsmTypography, withGtmEvent } from '@npm_leadtech/cv-lib-app-components';

import { withGtmCategory } from '../../hoc/withGtmCategory';
import fonts from '../../styles/fonts';

const { breakpoint } = dsmBreakpoints;

const SelectWithGtmEvent = withGtmEvent(withGtmCategory(Select));

export const StyledSelectWithGtmEvent = styled(SelectWithGtmEvent)`
    [data-tm-event-action] {
        :not([data-tm-event-action]) {
            pointer-events: none;
        }
        a,
        button,
        [data-tm-event-action],
        input,
        a:not([data-tm-event-action]),
        button:not([data-tm-event-action]),
        input:not([data-tm-event-action]) {
            pointer-events: visible;
        }
    }
`;

export const MenuItemWithGtmEvent = withGtmEvent(withGtmCategory(MenuItem));

export const StyledProfileDiv = styled.div`
    font-family: ${fonts.primary};
    font-size: 16px;
    padding: 32px 24px;
    border-bottom: 2px solid ${dsmColors.colorNeutral200};
    margin-bottom: 25px;

    ${breakpoint.screenXl} {
        border-right: 2px solid ${dsmColors.colorNeutral200};
        width: 50%;
        border-bottom: none;
        margin-bottom: 0;
    }

    ${breakpoint.screenS} {
        padding: 46px 32px;
    }
`;

export const StyledUnsubscribeLink = styled.div`
    text-decoration-line: underline;
    color: ${dsmColors.colorNeutral500};
    font-family: Roboto;
    margin-top: 20px;
    margin-bottom: 40px;
    & a,
    a:active,
    a:visited,
    a:hover {
        color: ${dsmColors.colorNeutral500};
        cursor: pointer;
    }
`;

export const StartNowBtn = styled.a`
    background-color: ${dsmColors.colorSecondary400Base};
    border-radius: 100px;
    color: ${dsmColors.colorNeutral00White};
    cursor: pointer;
    display: inline-block;
    height: 34px;
    letter-spacing: 0.5px;
    line-height: 35px;
    padding: 0 39px;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 500;

    @media (max-width: 992px) {
        padding: 9px 30px;
    }
`;

export const UpgradeBtn = styled.a`
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    color: #26a0f4;

    @media (max-width: 992px) {
        position: absolute;
        bottom: 10px;
    }
`;

export const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 578px;
    ${breakpoint.screenXl} {
        max-width: 1162px;
    }
`;

export const AccountManagementWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    border-top: 6px solid ${dsmColors.colorPrimary100};
    margin: 0 auto;
    border-radius: 4px;
    box-sizing: border-box;
    ${breakpoint.screenS} {
        box-shadow: 0 1px 4px 0 ${dsmColors.colorNeutral400}, 0 3px 8px 0 ${dsmColors.colorNeutral200};
    }
    ${breakpoint.screenXl} {
        flex-wrap: nowrap;
    }
`;

export const SubscriptionInfoSection = styled.div`
    width: 100%;
    padding: 32px 24px;
    ${breakpoint.screenXl} {
        width: 50%;
    }
    ${breakpoint.screenS} {
        padding: 46px 32px;
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

export const SectionTitle = styled.h1`
    ${dsmTypography.PrimaryFontFamily};
    color: ${dsmColors.colorNeutral900};
    ${dsmTypography.LTitle.styles};
    margin: 8px 0 16px 24px;
    ${breakpoint.screenL} {
        margin: 36px 0 40px;
    }
    ${breakpoint.screenM} {
        ${dsmTypography.XLTitle.styles};
    }
`;

export const StyledProfileTitle = styled.div`
    font-size: 20px;
    font-family: ${fonts.primary};
    font-weight: 500;
    margin-bottom: 32px;
`;
