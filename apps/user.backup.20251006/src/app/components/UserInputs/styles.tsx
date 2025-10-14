import styled from '@emotion/styled';
import { dsmBreakpoints, TextField } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

export const InputsWrapper = styled.div`
    width: 100%;
    margin-top: 24px;
    ${breakpoint.screenS} {
        width: calc(100% - 136px - 32px);
        margin-top: 0;
    }
`;

export const StyledTextField = styled(TextField)`
    width: 100% !important;
    &:not(:last-child) {
        margin-bottom: 24px;
    }
`;
