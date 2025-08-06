import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'

export const LoginPage = () => {
    return (
        <AuthLayout title="Iniciar sesión">
            <form>
                <Grid container direction="column">
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
                            sx={{
                                width: {
                                    xs: '100%',
                                    sm: '100%',
                                    md: '48%',
                                    lg: '48%'
                                },
                                mt: 2
                            }}>
                            <Button variant='contained' fullWidth>
                                Login
                            </Button>
                        </Grid>

                        <Grid
                            item
                            sx={{
                                width: {
                                    xs: '100%',
                                    sm: '100%',
                                    md: '48%',
                                    lg: '48%'
                                },
                                mt: 2
                            }}>
                            <Button variant='contained' fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>

                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent='end' sx={{ mt: 1 }}>
                        <Grid item>
                            <Link component={RouterLink} color='inherit' to='/auth/register'>
                                Crear una cuenta
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}