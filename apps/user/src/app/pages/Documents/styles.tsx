import styled from '@emotion/styled';
import { Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { dsmBreakpoints, dsmColors } from '@npm_leadtech/cv-lib-app-components';

import { isMobile } from '../../helpers/isMobile';

const { breakpoint, screenSize } = dsmBreakpoints;

const stylesTabs = makeStyles((theme: any) => ({
    tabsRoot: {
        margin: '0 auto 56px',
        flexGrow: 1,
        borderBottom: `2px solid ${dsmColors.colorNeutral200}`,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '0 auto 32px',
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: '1140px',
        },
    },
    tabsIndicator: {
        width: '100%',
        backgroundColor: dsmColors.colorPrimary600,
        borderRadius: '2px',
        height: '4px',
        marginTop: '12px',
    },
}));

const StyledTab = styled(Tab)`
    color: ${dsmColors.colorNeutral500};
    font-size: 20px;
    text-transform: initial;
    min-width: 0;
    padding: 0;
    margin-right: 32px;
    font-weight: normal;

    &.MuiTab-textColorInherit {
        color: ${dsmColors.colorNeutral500};
        opacity: 0.5;
    }

    &.Mui-selected {
        color: ${dsmColors.colorNeutral900};
    }

    @media (max-width: ${screenSize.s}) {
        font-weight: 500;
        font-size: 16px;
    }
`;

const PageWrapper = styled.div`
    position: relative;
    background-color: ${dsmColors.colorNeutral50};
    max-width: 100%;
    position: relative;
    display: flex;
    min-height: 100%;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
`;

const PageContainer = styled.div`
    max-width: 1180px;
    padding: 36px 16px;
    flex: 1;
    ${!isMobile() &&
    `
        margin: 0 auto;
        width: 100%;
    `}
    ${breakpoint.screenS} {
        padding: 72px 32px;
    }
`;

export { PageWrapper, PageContainer, StyledTab, stylesTabs };
