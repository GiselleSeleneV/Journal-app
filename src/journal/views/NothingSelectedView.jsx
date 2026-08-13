import { AutoStoriesOutlined } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"

export const NothingSelectedView = () => {
    const dispatch = useDispatch();
    const { isSaving } = useSelector(state => state.journal);

    const onClickNewNote = () => {
        dispatch(startNewNote());
    }

    return (
        <Box
            className='animate__animated animate__fadeIn anime__faster'
            sx={{
                minHeight: 'calc(100vh - 120px)',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
                background: 'linear-gradient(165deg, #0B1220 0%, #152038 48%, #1E1B4B 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: 360,
                    height: 360,
                    borderRadius: '50%',
                    top: -80,
                    right: -60,
                    background: 'radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    bottom: -70,
                    left: -50,
                    background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)',
                }}
            />

            <Box sx={{ position: 'relative', textAlign: 'center', maxWidth: 420 }}>
                <Box
                    sx={{
                        width: 84,
                        height: 84,
                        borderRadius: 3,
                        mx: 'auto',
                        mb: 3,
                        display: 'grid',
                        placeItems: 'center',
                        background: 'rgba(201,169,110,0.14)',
                        border: '1px solid rgba(201,169,110,0.32)',
                    }}
                >
                    <AutoStoriesOutlined sx={{ fontSize: 42, color: '#E8D5A8' }} />
                </Box>
                <Typography
                    sx={{
                        fontFamily: '"Fraunces", serif',
                        fontSize: { xs: 28, sm: 34 },
                        fontWeight: 500,
                        color: 'white',
                        mb: 1.5,
                        lineHeight: 1.2,
                    }}
                >
                    ¿Qué quieres escribir hoy?
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.68)', fontSize: 16, lineHeight: 1.7, mb: 3.5 }}>
                    Elige una nota a la izquierda o empieza una página nueva. Tu diario te espera.
                </Typography>
                <Button
                    onClick={onClickNewNote}
                    disabled={isSaving}
                    sx={{
                        px: 3,
                        py: 1.2,
                        borderRadius: 2.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: 15,
                        backgroundColor: '#C9A96E',
                        color: '#0F172A',
                        '&:hover': { backgroundColor: '#D4B87A' },
                    }}
                >
                    Nueva nota
                </Button>
            </Box>
        </Box>
    )
}
