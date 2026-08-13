import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: "primary.main", padding: "4" }}
        >
            <Grid
                item
                className='box-shadow'
                sx={{
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2,
                    width: {
                        xs: '90%',
                        sm: '70%',
                        md: '50%',
                        lg: '30%'
                    },
                    maxWidth: 500,   // Para evitar que sea demasiado ancho
                }}
            >
                <Typography variant='h5' sx={{ mb: 1 }}>{title}</Typography>

                {children}
            </Grid>
        </Grid>
    )
}