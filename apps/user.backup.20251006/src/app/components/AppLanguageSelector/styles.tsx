import styled from '@emotion/styled';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';

export const LanguageListContainer = styled.div<{ isMobile: boolean }>`
    background: ${dsmColors.colorNeutral00White};
    border-radius: var(--hx, 4px);
    box-shadow: 0px 3px 8px 0px #E7EBEE, 0px 1px 4px 0px #B5BABD;
    display: flex;
    gap: 16px;
    margin-top: 10px;
    padding: 8px 16px;
    position: absolute;
    z-index: 200;

    ${(props) => props.isMobile && `
        left: 0;
        margin-top: 20px;
        width: calc(100vw - 16px - 16px);
    `}

    .cv-option-item-container {
        text-align: left;
    }
`;

export const LanguageList = styled.div<{ isMobile: boolean }>`
    display: grid;
    grid-template-columns: 1fr 1fr;

    ${(props) => props.isMobile && `
        width: 100%;
    `}
`;

export const LanguageSelectorContainer = styled.div`
    .cv-language-selector-container__label {
        width: max-content;
    }
`;
