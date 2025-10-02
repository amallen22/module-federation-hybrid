/* eslint-disable no-unused-vars */
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';

export interface ContainerProps {
    disabled?: boolean;
    color: PMColorsType;
}

export const PMColors = {
    blue: '#C6DCED',
    lightBlue: dsmColors.colorPrimary50,
    pink: dsmColors.colorError50,
};

export const PMColorsHovered = {
    blue: '#A1CCEE',
    lightBlue: '#C6DCED',
    pink: dsmColors.colorError100,
};

export enum PMColorsEnum {
    BLUE = 'blue',
    LIGHT_BLUE = 'lightBlue',
    PINK = 'pink',
}

export type PMColorsType = PMColorsEnum.BLUE | PMColorsEnum.LIGHT_BLUE | PMColorsEnum.PINK;
