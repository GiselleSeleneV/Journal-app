import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch } from 'react-redux'
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth'

export const LoginPage = () => {
    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm({
        email: 'fernando@google.com',
        password: "123456"
    })

    const onSubmit = (e) => {
        e.preventDefault();

        console.log({ email, password })
        dispatch(checkingAuthentication());
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault();

        console.log({ email, password })
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout title="Iniciar sesión">
            <form onSubmit={onSubmit}>
                <Grid container direction="column">
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='correo@ejemplo.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='Contraseña'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
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
                            <Button type='submit' variant='contained' fullWidth>
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
                            <Button
                                variant='contained'
                                fullWidth
                                onClick={onGoogleSignIn}
                            >
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