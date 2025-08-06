import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors'

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: '#0F172A'
        },
        secundary: {
            main: "#543884"
        },
        error: {
            main: red.A400
        }
    }
})