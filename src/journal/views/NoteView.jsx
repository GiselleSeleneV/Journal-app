import { SaveOutlined } from "@mui/icons-material"
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { ImageGallery } from "../components"
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startSaveNote } from "../../store/journal"

export const NoteView = () => {
    const dispatch = useDispatch();

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        return new Date(date).toLocaleString('es-ES', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    return (
        <Box
            className='animate__animated animate__fadeIn anime__faster'
            sx={{
                minHeight: 'calc(100vh - 120px)',
                backgroundColor: 'white',
                borderRadius: 4,
                border: '1px solid rgba(15, 23, 42, 0.06)',
                boxShadow: '0 18px 50px rgba(15, 23, 42, 0.06)',
                px: { xs: 2.5, sm: 4, md: 5 },
                py: { xs: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    mb: 1,
                }}
            >
                <Box>
                    <Typography sx={{ fontSize: 13, color: '#C9A96E', fontWeight: 600, letterSpacing: 0.4, mb: 0.5 }}>
                        TU PÁGINA
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: '"Fraunces", serif',
                            fontSize: { xs: 22, sm: 28 },
                            fontWeight: 500,
                            color: '#0F172A',
                            textTransform: 'capitalize',
                        }}
                    >
                        {dateString}
                    </Typography>
                </Box>

                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : <SaveOutlined />}
                    sx={{
                        px: 2.5,
                        py: 1.1,
                        borderRadius: 2.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: 15,
                        boxShadow: 'none',
                        backgroundColor: '#0F172A',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#1E293B',
                            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.18)',
                        },
                    }}
                >
                    Guardar
                </Button>
            </Box>

            <TextField
                type="text"
                variant="standard"
                fullWidth
                placeholder="Título de tu día"
                name='title'
                value={title}
                onChange={onInputChange}
                InputProps={{ disableUnderline: true }}
                sx={{
                    mt: 2,
                    mb: 1,
                    '& .MuiInputBase-input': {
                        fontFamily: '"Fraunces", serif',
                        fontSize: { xs: 28, sm: 34 },
                        fontWeight: 500,
                        color: '#0F172A',
                        '::placeholder': {
                            color: 'rgba(15, 23, 42, 0.28)',
                            opacity: 1,
                        },
                    },
                }}
            />

            <TextField
                type="text"
                variant="standard"
                fullWidth
                multiline
                rows={3}
                maxRows={3}
                placeholder="¿Qué sucedió en el día de hoy?"
                name='body'
                value={body}
                onChange={onInputChange}
                InputProps={{ disableUnderline: true }}
                sx={{
                    mt: 1,
                    '& .MuiInputBase-root': {
                        height: 88,
                        alignItems: 'flex-start',
                        overflow: 'hidden',
                    },
                    '& .MuiInputBase-input': {
                        height: '100% !important',
                        overflowY: 'auto !important',
                        boxSizing: 'border-box',
                        fontSize: 17,
                        lineHeight: 1.75,
                        color: '#334155',
                        '::placeholder': {
                            color: 'rgba(15, 23, 42, 0.32)',
                            opacity: 1,
                        },
                    },
                }}
            />

            <ImageGallery />
        </Box>
    )
}
