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
            className="journal-fade-in"
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
                className="journal-empty-orb"
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
                className="journal-empty-orb"
                sx={{
                    position: 'absolute',
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    bottom: -70,
                    left: -50,
                    background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)',
                    animationDelay: '1.2s',
                }}
            />

            <Box sx={{ position: 'relative', textAlign: 'center', maxWidth: 420 }}>
                <Box
                    className="journal-empty-icon journal-scale-in"
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
                    className="journal-fade-up journal-delay-1"
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
                <Typography
                    className="journal-fade-up journal-delay-2"
                    sx={{ color: 'rgba(255,255,255,0.68)', fontSize: 16, lineHeight: 1.7, mb: 3.5 }}
                >
                    Elige una nota a la izquierda o empieza una página nueva. Tu diario te espera.
                </Typography>
                <Button
                    className="journal-fade-up journal-delay-3"
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
                        transition: 'transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
                        '&:hover': {
                            backgroundColor: '#D4B87A',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 28px rgba(201,169,110,0.28)',
                        },
                    }}
                >
                    Nueva nota
                </Button>
            </Box>
        </Box>
    )
}
