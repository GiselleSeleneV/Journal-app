import { SaveOutlined, Star, StarBorder } from "@mui/icons-material"
import { Box, Button, CircularProgress, IconButton, TextField, Typography } from "@mui/material"
import { NoteImageGallery } from "../components"
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useState } from "react"
import { setActiveNote, toggleNoteImage } from "../../store/journal/journalSlice"
import { startSaveNote, startToggleFavorite } from "../../store/journal"
import { formatSavedAgo } from "../../helpers"

export const NoteView = () => {
    const dispatch = useDispatch();
    const [savedLabel, setSavedLabel] = useState('');

    const { active: note, lastSavedAt, isSaving } = useSelector(state => state.journal);
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
        if (!formState?.id) return;

        dispatch(setActiveNote({
            title: formState.title ?? '',
            body: formState.body ?? '',
            date: formState.date,
            id: formState.id,
        }))
    }, [formState]);

    useEffect(() => {
        if (!lastSavedAt) {
            setSavedLabel('');
            return;
        }

        const updateLabel = () => setSavedLabel(formatSavedAgo(lastSavedAt));
        updateLabel();
        const intervalId = setInterval(updateLabel, 15000);
        return () => clearInterval(intervalId);
    }, [lastSavedAt]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onToggleImage = (url) => {
        dispatch(toggleNoteImage(url));
    }

    const onToggleFavorite = () => {
        if (!note?.id) return;
        dispatch(startToggleFavorite(note.id));
    }

    return (
        <Box
            className="journal-note-shell"
            sx={{
                minHeight: 'calc(100vh - 120px)',
                background: 'linear-gradient(180deg, #FAF7F2 0%, #F3EEE6 100%)',
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
                    {savedLabel && (
                        <Typography sx={{ mt: 0.75, fontSize: 13, color: 'rgba(15, 23, 42, 0.45)' }}>
                            {savedLabel}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        onClick={onToggleFavorite}
                        disabled={isSaving}
                        aria-label={note?.isFavorite ? 'Quitar de favoritos' : 'Marcar favorito'}
                        sx={{
                            color: note?.isFavorite ? '#C9A96E' : 'rgba(15, 23, 42, 0.35)',
                            border: '1px solid rgba(15, 23, 42, 0.1)',
                            borderRadius: 2.5,
                            '&:hover': {
                                backgroundColor: 'rgba(201, 169, 110, 0.1)',
                                color: '#C9A96E',
                            },
                        }}
                    >
                        {note?.isFavorite ? <Star /> : <StarBorder />}
                    </IconButton>

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
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(15, 23, 42, 0.45)',
                                color: 'rgba(255, 255, 255, 0.85)',
                            },
                        }}
                    >
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </Button>
                </Box>
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
                rows={2}
                maxRows={2}
                placeholder="¿Qué sucedió en el día de hoy?"
                name='body'
                value={body}
                onChange={onInputChange}
                InputProps={{ disableUnderline: true }}
                sx={{
                    mt: 1,
                    '& .MuiInputBase-root': {
                        height: 56,
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

            <NoteImageGallery
                selectedUrls={note?.imageUrls || []}
                onToggle={onToggleImage}
                disabled={isSaving}
            />
        </Box>
    )
}
