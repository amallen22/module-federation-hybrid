import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

const DocumentBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 256px;
    height: 362px;
    border-radius: 4px;
    box-shadow: 0 1px 4px 0 ${dsmColors.colorNeutral400}, 0 3px 8px 0 ${dsmColors.colorNeutral200};
    overflow-x: hidden;
    transition: 0.3s all;
    background-color: ${dsmColors.colorNeutral00White};
    margin: 16px 20px;
    &:hover {
        box-shadow: 0 3px 8px 0 rgba(181, 186, 189, 0.75);
    }
    ${breakpoint.screenL} {
        margin: 0 18px 40px;
    }
`;

export { DocumentBoxWrapper };
