import { Link as RouterLink } from 'react-router-dom'
import {
    Alert, Box, Button, CircularProgress, IconButton, InputAdornment,
    Link, TextField, Typography
} from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailAndPassword } from '../../store/auth'
import { LockOutlined, MailOutline, PersonOutline, Visibility, VisibilityOff } from '@mui/icons-material'

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

const fieldStyles = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 2.5,
        backgroundColor: '#FAFAF8',
        '& fieldset': { borderColor: 'rgba(15, 23, 42, 0.12)' },
        '&:hover fieldset': { borderColor: 'rgba(15, 23, 42, 0.28)' },
        '&.Mui-focused fieldset': { borderColor: '#0F172A' },
    },
}

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
        <AuthLayout
            title="Crea tu cuenta"
            subtitle="Empieza a guardar tus pensamientos en un solo lugar."
        >
            <Box
                component="form"
                onSubmit={onSubmit}
                className="animate__animated animate__fadeIn anime__faster"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}
            >
                <TextField
                    label="Nombre completo"
                    type="text"
                    placeholder="Tu nombre"
                    fullWidth
                    name="displayName"
                    value={displayName}
                    onChange={onInputChange}
                    error={!!displayNameValid && formSubmitted}
                    helperText={formSubmitted ? displayNameValid : ''}
                    sx={fieldStyles}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonOutline sx={{ color: '#94A3B8', fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="Correo"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    fullWidth
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    error={!!emailValid && formSubmitted}
                    helperText={formSubmitted ? emailValid : ''}
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
                    error={!!passwordValid && formSubmitted}
                    helperText={formSubmitted ? passwordValid : ''}
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
                    disabled={!isFormValid || isCheckingAuthentication}
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
                    {isCheckingAuthentication
                        ? <CircularProgress size={22} color="inherit" />
                        : 'Crear cuenta'}
                </Button>

                <Typography sx={{ mt: 1, textAlign: 'center', color: '#64748B', fontSize: 14.5 }}>
                    ¿Ya tienes cuenta?{' '}
                    <Link
                        component={RouterLink}
                        to="/auth/login"
                        underline="hover"
                        sx={{ color: '#0F172A', fontWeight: 700 }}
                    >
                        Iniciar sesión
                    </Link>
                </Typography>
            </Box>
        </AuthLayout>
    )
}
