import styled from '@emotion/styled';
import { Button } from '@npm_leadtech/cv-lib-app-components';

const StyledBlockerDiv = styled.div`
    width: 100%;
    cursor: pointer;
    position: relative;
    margin: 20px auto 32px;
`;

const StyledButton = styled(Button)`
// this styled will be removed with new colors implementation.
&.MuiButton-root {
        background-color: hsl(208, 100%, 40%);
        &:disabled {
            background-color: hsl(208, 100%, 88%);
        }
        &:hover{
            background-color: hsl(208, 100%, 32%);
        }
        &:active {
            background-color: hsl(208, 100%, 24%);
        }
    }
`;

export { StyledBlockerDiv, StyledButton };