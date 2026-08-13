import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography, InputAdornment, IconButton } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailAndPassword } from '../../store/auth'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const formData = {
    email: '',
    password: "",
    displayName: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 caracteres'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
};

export const RegisterPage = () => {
    const dispatch = useDispatch()
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const {
        displayName, email, password, formState, onInputChange,
        displayNameValid, emailValid, passwordValid, isFormValid

    } = useForm(formData, formValidations);

    const onSubmit = (e) => {
        e.preventDefault();

        setFormSubmitted(true)

        if (!isFormValid) return;

        dispatch(startCreatingUserWithEmailAndPassword(formState))
    }

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <AuthLayout title="Crear cuenta">
            <form onSubmit={onSubmit} className='animate__animated animate__fadeIn anime__faster'>
                <Grid container direction="column">
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre completo'
                            type='text'
                            placeholder='Tu nombre'
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='correo@ejemplo.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
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
                            error={!!passwordValid && formSubmitted}
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

                    <Grid container spacing='2' sx={{
                        justifyContent: 'space-between',
                    }}>
                        <Grid
                            item
                            sx={{ mt: 2, width: '100%' }}
                            display={errorMessage ? '' : 'none'}>
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>

                        <Grid
                            item
                            sx={{ mt: 2, width: '100%' }}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                disabled={!isFormValid || isCheckingAuthentication}
                            >
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