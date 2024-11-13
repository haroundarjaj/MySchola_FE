import { createTheme } from "@mui/material";

export const generateTheme = (theme, showToolBar) => {
    return createTheme({
        components: {
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        fontSize: 20
                    }
                }
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: theme.palette.primary.main,
                        '&:hover': {
                            color: theme.palette.secondary.main
                        }
                    }
                }
            },
            MUIDataTableToolbar: {
                styleOverrides: {
                    icon: {
                        color: theme.palette.primary.main,
                        '&:hover': {
                            color: theme.palette.secondary.main
                        }
                    }
                }
            },
            MUIDataTableToolbarSelect: {
                styleOverrides: {
                    root: {
                        padding: 15
                    },
                    title: {
                        visibility: 'hidden'
                    }
                }
            },
            MUIDataTableFilterList: {
                styleOverrides: {
                    root: {
                        marginBottom: 10
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none'
                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderTop: '1px solid rgba(224, 224, 224, 1)',
                        borderBottom: 'none'
                    }
                }
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        display: showToolBar ? 'flex' : 'none'
                    }
                }
            }
        }
    });
}