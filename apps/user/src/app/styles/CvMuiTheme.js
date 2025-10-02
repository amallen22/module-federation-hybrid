import { adaptV4Theme, createTheme } from '@mui/material/styles';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';

import { background, buttons, common, primary, secondary, tertiary } from './colors';
import fonts from './fonts';

export const CvMuiTheme = createTheme(
    adaptV4Theme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 540,
                md: 768,
                lg: 992,
                xl: 1200,
            },
        },
        palette: {
            primary: {
                main: primary.primary,
                alt: primary.alt,
                gray: common.gray,
                white: common.white,
                blueDark: background.blueDark,
                blue: primary.light,
            },
            secondary: {
                main: secondary.secondary,
                gray: background.lightGray,
                green: tertiary.green,
            },
            info: {
                main: background.white,
            },
            success: {
                main: background.green,
                secondary: tertiary.greenLight,
            },
            error: {
                main: background.red,
                secondary: tertiary.redLight,
            },
        },
        typography: {
            fontFamily: fonts.primary,
            useNextVariants: true,
        },
        overrides: {
            MuiFormLabel: {
                root: {
                    '&.Mui-focused': {
                        color: dsmColors.colorPrimary500,
                    },
                },
            },
            MuiInput: {
                underline: {
                    '&:after': {
                        borderBottom: `2px solid ${dsmColors.colorPrimary500}`,
                    },
                },
            },
            MuiInputLabel: {
                outlined: {
                    '&.MuiInputLabel-shrink': {
                        transform: 'translate(18px, 9px)',
                        fontSize: 12,
                    },
                    fontSize: 16,
                    color: dsmColors.colorNeutral400,
                },
            },
            MuiFormHelperText: {
                contained: {
                    marginTop: 3,
                },
            },
            MuiFilledInput: {
                underline: {
                    '&:after': {
                        borderBottom: `2px solid ${dsmColors.colorPrimary500}`,
                    },
                },
            },
            MuiOutlinedInput: {
                root: {
                    borderRadius: 4,
                    backgroundColor: dsmColors.colorNeutral100,
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: dsmColors.colorPrimary500,
                        backgroundColor: dsmColors.colorNeutral00White,
                        borderWidth: 1,
                        '&$legend': {
                            width: 0.01,
                        },
                    },
                    '& $legend': {
                        opacity: 0,
                        display: 'none',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: dsmColors.colorNeutral100,
                        top: 0,
                    },
                    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
                        borderColor: dsmColors.colorNeutral50,
                        backgroundColor: dsmColors.colorNeutral50,

                        '@media (hover: none)': {
                            borderColor: dsmColors.colorNeutral50,
                        },
                    },
                    '&:hover:not(.Mui-disabled):not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                        backgroundColor: dsmColors.colorNeutral50,
                    },
                    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: dsmColors.colorNeutral100,
                    },
                },
                input: {
                    boxSizing: 'border-box',
                    color: dsmColors.colorNeutral900,
                    height: 55,
                    padding: '25.5px 18.5px 12.5px 18.5px',
                    zIndex: 1,
                    '&.Mui-disabled': {
                        color: dsmColors.colorNeutral500,
                    },
                },
                adornedEnd: {
                    paddingRight: '4px',
                },
            },
            MuiPickersModal: {
                dialogRoot: {
                    zIndex: '2000',
                    width: 'auto',
                },
                dialog: {
                    minHeight: '0',
                    display: 'flex',
                    flexDirection: 'column',
                },
            },
            MuiPickersToolbar: {
                toolbar: {
                    flex: '0 0 auto',
                },
            },
            MuiPickersYearSelection: {
                container: {
                    flex: '1 1 auto',
                },
            },
            MuiFormControlLabel: {
                root: {
                    // width: '100%',
                    marginLeft: '0',
                    marginRight: '0',
                },
            },
            MuiAppBar: {
                root: {
                    backgroundColor: primary.light,
                    boxShadow: 'none',
                    paddingRight: '0px',
                },
            },
            MuiButton: {
                root: {
                    textTransform: 'none',
                    borderRadius: 25,
                    boxShadow: 'none',
                    margin: '0 4px',
                    '&:active': {
                        boxShadow: 'none',
                    },
                    '@media (min-width: 769px)': {
                        minWidth: '104px',
                    },
                },
                contained: {
                    backgroundColor: buttons.primary,
                    color: common.white,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: buttons.primary,
                        '@media (hover: none)': {
                            backgroundColor: buttons.primary,
                        },
                    },
                },
                text: {
                    textTransform: 'uppercase',
                    color: common.gray,
                    padding: '5px',
                    '&:hover': {
                        backgroundColor: background.transparentGray,
                    },
                },
                textSecondary: {
                    textTransform: 'uppercase',
                    color: secondary.secondary,
                    float: 'right',
                    width: '50%',
                    lineHeight: '20px',
                    height: 'auto',
                    marginBottom: '15px',
                    padding: '5px',
                    '&:hover': {
                        backgroundColor: background.transparentGray,
                        '@media (hover: none)': {
                            backgroundColor: background.transparentGray,
                        },
                    },
                },
            },
            MuiButtonBase: {
                root: {
                    borderRadius: 5,
                },
            },
            MuiDialog: {
                root: {
                    zIndex: '99999',
                },
                paper: {
                    maxWidth: '768px',
                },
            },
            MuiDialogContent: {
                root: {
                    color: common.grayMessage,
                    fontSize: '18px',
                    lineHeight: '24px',
                    fontFamily: fonts.primary,
                    fontWeight: 'normal',
                },
            },
            MuiDialogActions: {
                root: {
                    '@media (min-width: 769px)': {
                        marginLeft: 24,
                        marginRight: 24,
                        marginBottom: 24,
                    },
                },
            },
            MuiDrawer: {
                paper: {
                    backgroundColor: primary.alt,
                },
            },
            MuiPaper: {
                rounded: {
                    borderRadius: '0',
                },
            },
            MuiMenuItem: {
                root: {
                    borderRadius: 0,
                    paddingBottom: 4,
                    paddingTop: 4,
                },
            },
            MuiSnackbar: {
                root: {
                    zIndex: 1900,
                },
                anchorOriginTopCenter: {
                    top: 80,
                },
                anchorOriginBottomCenter: {
                    bottom: 60,
                },
            },
            MuiSnackbarContent: {
                root: {
                    border: `1px solid ${primary.alt}`,
                    color: primary.alt,
                },
                action: {
                    alignSelf: 'flex-start',
                    paddingLeft: 16,
                    paddingTop: 5,
                },
            },
            MuiCard: {
                root: {
                    display: 'flex',
                    flexDirection: 'row',
                },
            },
            MuiCardHeader: {
                title: {
                    color: '#474a4f',
                    fontSize: '15px',
                    padding: '0px',
                },
            },
            MuiCardContent: {
                root: {
                    wordWrap: 'break-word',
                    color: '#7F848C',
                    fontSize: '13px',
                    lineHeight: '16px',
                    width: '90%',
                    display: 'block',
                    fontFamily: fonts.primary,
                },
            },
            MuiPrivateNotchedOutline: {
                root: {
                    top: 0,
                },
                legend: {
                    display: 'none',
                },
            },
            MuiTypography: {
                root: {
                    width: '100%',
                    '&:first-letter': {
                        textTransform: 'uppercase',
                    },
                },
            },
            MuiSwitch: {
                colorPrimary: {
                    '&.Mui-checked': {
                        color: primary.light,
                    },
                },
            },
            MuiPickersCalendarHeader: {
                iconButton: {
                    padding: '12px',
                    boxSizing: 'content-box',
                    color: 'rgba(0,0,0,0.54)',
                },
            },
            MuiBadge: {
                badge: {
                    fontFamily: fonts.secondary,
                    color: common.white,
                },
            },
            MuiFab: {
                root: {
                    height: 36,
                    width: 36,
                    boxShadow: 'none',
                    '&:active': {
                        boxShadow: 'none',
                    },
                },
            },
            MuiList: {
                padding: {
                    paddingTop: 0,
                    paddingBottom: 0,
                },
            },
            MuiPickersMonthSelection: {
                container: {
                    width: '100%',
                },
            },
            MuiTooltip: {
                tooltipPlacementRight: {
                    '@media (min-width: 769px)': {
                        margin: 0,
                    },
                },
                tooltipPlacementLeft: {
                    '@media (min-width: 769px)': {
                        margin: 0,
                    },
                },
                tooltipPlacementTop: {
                    '@media (min-width: 769px)': {
                        margin: 0,
                    },
                },
                tooltipPlacementBottom: {
                    '@media (min-width: 769px)': {
                        margin: 0,
                    },
                },
                tooltip: {
                    backgroundColor: '#FFF',
                    border: '1px solid #56B1F5',
                    borderRadius: 4,
                    color: '#3D4042',
                    maxWidth: 320,
                    fontSize: 14,
                    padding: '20px 60px',
                    '& .arrow': {
                        background: '#FFF',
                        border: 'solid #56b1f5',
                        borderWidth: '0 1px 1px 0',
                        display: 'inline-block',
                        padding: 7,
                        position: 'absolute',
                        top: 45,
                        left: -8,
                        transform: 'rotate(135deg)',
                        '&.bottom-start': {
                            top: -8,
                            right: '32%',
                            left: 'auto',
                            borderWidth: '0  0 1px 1px',
                        },
                    },
                    '& .close-icon': {
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        height: 24,
                        width: 24,
                        cursor: 'pointer',
                        pointerEvents: 'all',
                        transition: 'transform 300ms ease-in-out',
                        '&:hover': {
                            transform: 'rotate(180deg)',
                        },
                    },
                    '& .icon-balloon': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#E1F1FD',
                        borderRadius: 16,
                        position: 'absolute',
                        left: 20,
                        top: 10,
                        height: 32,
                        width: 32,
                        '& .icon': {
                            fill: '#26A0F4',
                            margin: 6,
                        },
                    },
                },
                popper: {
                    opacity: 1,
                    zIndex: 2001 /* navbar has 2000 */,
                },
            },
        },
    }),
);
