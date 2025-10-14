export const medium = 992;
export const smallScreenUP = 769;

const smallScreenUp = `${smallScreenUP}px`;
const mediumScreenUp = '993px';
const largeScreenUp = '1201px';
const veryLargeScreenUp = '1351px';
const extraSmallScreen = '450px';
const smallScreen = '768px';
const mediumScreen = `${medium}px`;
const mediumLargeScreen = '1024px';
const largeScreen = '1270px';
const veryLargeScreen = '1350px';
const extraLargeScreen = '1500px';

export const breakpoint = {
    breakpoint: {
        medium,
        smallScreenUP,
    },
};

export const media = {
    smallAndUp: `only screen and (min-width: ${smallScreenUp})`,
    mediumAndUp: `only screen and (min-width: ${mediumScreenUp})`,
    mediumLargeAndUp: `only screen and (min-width: ${mediumLargeScreen})`,
    largeAndUp: `only screen and (min-width: ${largeScreenUp})`,
    veryLargeAndUp: `only screen and (min-width: ${veryLargeScreenUp})`,
    extraSmallAndDown: `only screen and (max-width: ${extraSmallScreen})`,
    smallAndDown: `only screen and (max-width: ${smallScreen})`,
    mediumAndDown: `only screen and (max-width: ${mediumScreen})`,
    mediumLargeAndDown: `only screen and (max-width: ${mediumLargeScreen})`,
    largeAndDown: `only screen and (max-width: ${largeScreen})`,
    veryLargeAndDown: `only screen and (max-width: ${veryLargeScreen})`,
    extraLargeAndDown: `only screen and (max-width: ${extraLargeScreen})`,
    mediumOnly: `only screen and (min-width: ${smallScreenUp}) and (max-width : ${mediumScreen})`,
};
