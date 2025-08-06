import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
    return (
        <AuthLayout title="Crear cuenta">
            <form>
                <Grid container direction="column">
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre completo'
                            type='text'
                            placeholder='Tu nombre'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='correo@ejemplo.com'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='Contraseña'
                            fullWidth
                        />
                    </Grid>

                    <Grid container spacing='2' sx={{
                        justifyContent: 'space-between',
                    }}>
                        <Grid
                            item
                            sx={{ mt: 2, width: '100%' }}>
                            <Button variant='contained' fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end" alignItems="center" sx={{ mt: 1 }}>
                        <Grid item>
                            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} color="inherit" to="/auth/login">
                                Ingresar
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}