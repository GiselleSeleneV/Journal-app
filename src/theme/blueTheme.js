import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors'

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: '#0F172A'
        },
        secondary: {
            main: '#C9A96E'
        },
        secundary: {
            main: "#543884"
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#FAF7F2',
            paper: '#FFFFFF'
        }
    },
    typography: {
        fontFamily: '"DM Sans", "Roboto", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#FAF7F2',
                }
            }
        }
    }
})
