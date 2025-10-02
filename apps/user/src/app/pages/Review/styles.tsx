import styled from '@emotion/styled';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';

export const PageWrapper = styled.div`
    background-color: ${dsmColors.colorNeutral100};
    position: relative;
    max-width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
`;

export const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-family: roboto;
`;

export const LeftColumn = styled.div`
    width: 491px;
`;

export const RightColumn = styled.div`
    width: 376px;
`;
