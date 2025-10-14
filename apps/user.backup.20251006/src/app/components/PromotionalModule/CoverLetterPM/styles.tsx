import styled from '@emotion/styled';

import { DB_BREAKPOINT } from '../../../pages/Dashboard/styles';

export const AnimationContainer = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: row-reverse;
    top: 0;
    right: 0;
    border-radius: 0 24px 24px 0;
    overflow: hidden;

    .lottie2 {
        position: relative;
        margin-right: 0px;
        height: 108%;
    }

    @media only screen and (max-width: ${DB_BREAKPOINT.L}) {
        .lottie2 {
            margin-right: -50px;
        }
    }

    @media only screen and (max-width: ${DB_BREAKPOINT.M}) {
        flex-direction: row;
        .lottie2 {
            margin-left: 190px;
            margin-right: -100px;
        }
    }

    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        position: relative;
        flex-direction: row;
        .lottie2 {
            margin-left: 0;
        }
    }
`;

export const ColumnContainer = styled.div`
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    position: absolute;
    .lottie1 {
        position: absolute;
        left: 0px;
        bottom: -5px;
        width: 180px;
    }

    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        right: 12px;
        display: flex;
        .lottie1 {
            position: relative;
            min-width: 120px;
        }
    }
`;
