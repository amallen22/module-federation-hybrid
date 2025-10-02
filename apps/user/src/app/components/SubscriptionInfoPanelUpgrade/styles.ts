import styled from '@emotion/styled';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';

import fonts from '../../styles/fonts';

const HeaderWrapper = styled.div`
    display: flex;

    @media (max-width: 992px) {
        flex-direction: column;
        min-width: auto;
    }
`;

const HeaderButtonWrapper = styled.div`
    width: 69%;
    text-align: right;
    margin-top: 12px;

    @media (max-width: 992px) {
        position: absolute;
        bottom: 0;
        width: 100%;
        margin-right: 15px;
    }
`;

const UnlockTitle = styled.p`
    font-family: ${fonts.primary};
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    margin-top: 0;
    color: ${dsmColors.colorNeutral900};
`;

const ListOfFeatures = styled.ul`
    padding: 0;
    list-style: none;

    > li {
        display: flex;
        font-family: ${fonts.primary};
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        margin: 0 0 16px 0;
        color: ${dsmColors.colorNeutral700};

        > img {
            margin-right: 12px;
        }
    }
`;

const Wrapper = styled.div`
    @media (max-width: 992px) {
        position: relative;
        padding-bottom: 7em;
    }
`;

const StartingFrom = styled.p`
    font-family: ${fonts.primary};
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    color: ${dsmColors.colorNeutral500};
    padding-right: 20px;

    @media (max-width: 992px) {
        padding-right: 0;
    }
`;

export { HeaderWrapper, HeaderButtonWrapper, UnlockTitle, ListOfFeatures, Wrapper, StartingFrom };
