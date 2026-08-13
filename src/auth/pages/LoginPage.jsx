import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Google, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography, IconButton, InputAdornment, Alert } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth'


const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 caracteres'],
};

const formData = {
    email: '',
    password: '',

}

export const LoginPage = () => {
    const { status, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const {
        email, password, onInputChange,
        emailValid, passwordValid, isFormValid

    } = useForm(formData, formValidations)

    const [showPassword, setShowPassword] = useState(false);
    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailAndPassword({ email, password }));
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault();
        dispatch(startGoogleSignIn());
    }

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <AuthLayout title="Iniciar sesión">
            <form onSubmit={onSubmit} className='animate__animated animate__fadeIn anime__faster'>
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
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Contraseña'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            helperText={passwordValid}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid container>
                        <Grid
                            item
                            sx={{ mt: 1, width: '100%' }}
                            display={errorMessage ? '' : 'none'}>
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing='2' sx={{ justifyContent: 'space-between' }}>
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
                                type='submit'
                                variant='contained'
                                fullWidth
                                disabled={!isFormValid || isAuthenticating}
                            >
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
