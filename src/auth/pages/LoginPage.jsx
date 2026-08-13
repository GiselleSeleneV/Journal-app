import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Google, LockOutlined, MailOutline, Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Alert, Box, Button, CircularProgress, Divider, IconButton,
    InputAdornment, Link, TextField, Typography
} from '@mui/material'
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

const fieldStyles = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 2.5,
        backgroundColor: '#FAFAF8',
        '& fieldset': { borderColor: 'rgba(15, 23, 42, 0.12)' },
        '&:hover fieldset': { borderColor: 'rgba(15, 23, 42, 0.28)' },
        '&.Mui-focused fieldset': { borderColor: '#0F172A' },
    },
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
        <AuthLayout
            title="Hola de nuevo"
            subtitle="Inicia sesión para seguir escribiendo tu diario."
        >
            <Box
                component="form"
                onSubmit={onSubmit}
                className="animate__animated animate__fadeIn anime__faster"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}
            >
                <TextField
                    label="Correo"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    fullWidth
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    helperText={emailValid}
                    sx={fieldStyles}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutline sx={{ color: '#94A3B8', fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
                    fullWidth
                    name="password"
                    value={password}
                    onChange={onInputChange}
                    helperText={passwordValid}
                    sx={fieldStyles}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined sx={{ color: '#94A3B8', fontSize: 20 }} />
                            </InputAdornment>
                        ),
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

                <Box display={errorMessage ? 'block' : 'none'}>
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                        {errorMessage}
                    </Alert>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={!isFormValid || isAuthenticating}
                    sx={{
                        mt: 0.5,
                        py: 1.35,
                        borderRadius: 2.5,
                        textTransform: 'none',
                        fontSize: 16,
                        fontWeight: 600,
                        boxShadow: 'none',
                        backgroundColor: '#0F172A',
                        '&:hover': {
                            backgroundColor: '#1E293B',
                            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.22)',
                        },
                    }}
                >
                    {isAuthenticating ? <CircularProgress size={22} color="inherit" /> : 'Iniciar sesión'}
                </Button>

                <Divider sx={{ my: 0.5, color: '#94A3B8', fontSize: 13 }}>
                    o continúa con
                </Divider>

                <Button
                    variant="outlined"
                    fullWidth
                    disabled={isAuthenticating}
                    onClick={onGoogleSignIn}
                    sx={{
                        py: 1.2,
                        borderRadius: 2.5,
                        textTransform: 'none',
                        fontSize: 15,
                        fontWeight: 600,
                        color: '#0F172A',
                        borderColor: 'rgba(15, 23, 42, 0.16)',
                        backgroundColor: 'white',
                        '&:hover': {
                            borderColor: '#0F172A',
                            backgroundColor: '#FAFAF8',
                        },
                    }}
                >
                    <Google sx={{ mr: 1, fontSize: 20 }} />
                    Google
                </Button>

                <Typography sx={{ mt: 1, textAlign: 'center', color: '#64748B', fontSize: 14.5 }}>
                    ¿Aún no tienes cuenta?{' '}
                    <Link
                        component={RouterLink}
                        to="/auth/register"
                        underline="hover"
                        sx={{ color: '#0F172A', fontWeight: 700 }}
                    >
                        Crear una cuenta
                    </Link>
                </Typography>
            </Box>
        </AuthLayout>
    )
}
