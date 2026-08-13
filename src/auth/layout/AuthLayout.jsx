import { AutoStoriesOutlined } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"

const highlights = [
    'Escribe con calma, sin prisa.',
    'Conserva lo que no quieres olvidar.',
    'Tu diario, siempre a tu alcance.',
]

export const AuthLayout = ({ children, title = '', subtitle = '' }) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                fontFamily: '"DM Sans", "Roboto", sans-serif',
            }}
        >
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1.05,
                    position: 'relative',
                    overflow: 'hidden',
                    px: { md: 7, lg: 10 },
                    py: 7,
                    background: 'linear-gradient(165deg, #0B1220 0%, #152038 48%, #1E1B4B 100%)',
                    color: 'white',
                }}
            >
                <Box
                    className="journal-empty-orb"
                    sx={{
                        position: 'absolute',
                        width: 420,
                        height: 420,
                        borderRadius: '50%',
                        top: -120,
                        right: -80,
                        background: 'radial-gradient(circle, rgba(201,169,110,0.22) 0%, transparent 70%)',
                    }}
                />
                <Box
                    className="journal-empty-orb"
                    sx={{
                        position: 'absolute',
                        width: 320,
                        height: 320,
                        borderRadius: '50%',
                        bottom: -90,
                        left: -70,
                        background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 70%)',
                        animationDelay: '1.4s',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                        opacity: 0.35,
                    }}
                />

                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            display: 'grid',
                            placeItems: 'center',
                            background: 'rgba(201,169,110,0.16)',
                            border: '1px solid rgba(201,169,110,0.35)',
                        }}
                    >
                        <AutoStoriesOutlined sx={{ color: '#E8D5A8' }} />
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: '"Fraunces", serif',
                            fontWeight: 600,
                            letterSpacing: 0.4,
                            fontSize: 22,
                        }}
                    >
                        Journal
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative', maxWidth: 460 }}>
                    <Typography
                        sx={{
                            fontFamily: '"Fraunces", serif',
                            fontSize: { md: 42, lg: 50 },
                            lineHeight: 1.15,
                            fontWeight: 500,
                            mb: 2.5,
                        }}
                    >
                        Un espacio íntimo para lo que importa.
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.7, mb: 4 }}>
                        Escribe, recuerda y vuelve a tus días cuando lo necesites. Tu diario personal, con calma y sin ruido.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {highlights.map((item) => (
                            <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box
                                    sx={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: '50%',
                                        backgroundColor: '#C9A96E',
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography sx={{ color: 'rgba(255,255,255,0.82)', fontSize: 15 }}>
                                    {item}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Typography sx={{ position: 'relative', color: 'rgba(255,255,255,0.38)', fontSize: 13 }}>
                    Las palabras de hoy son el mapa de mañana.
                </Typography>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: { xs: 2.5, sm: 4 },
                    py: { xs: 5, md: 6 },
                    background: 'linear-gradient(180deg, #FAF7F2 0%, #F3EEE6 100%)',
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 420 }}>
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            alignItems: 'center',
                            gap: 1.25,
                            mb: 4,
                        }}
                    >
                        <Box
                            sx={{
                                width: 38,
                                height: 38,
                                borderRadius: 1.5,
                                display: 'grid',
                                placeItems: 'center',
                                backgroundColor: '#0F172A',
                            }}
                        >
                            <AutoStoriesOutlined sx={{ color: '#E8D5A8', fontSize: 22 }} />
                        </Box>
                        <Typography
                            sx={{
                                fontFamily: '"Fraunces", serif',
                                fontWeight: 600,
                                fontSize: 22,
                                color: '#0F172A',
                            }}
                        >
                            Journal
                        </Typography>
                    </Box>

                    <Box
                        className="auth-card animate__animated animate__fadeIn"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 4,
                            px: { xs: 3, sm: 4.5 },
                            py: { xs: 4, sm: 5 },
                            border: '1px solid rgba(15, 23, 42, 0.06)',
                            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: '"Fraunces", serif',
                                fontSize: { xs: 28, sm: 32 },
                                fontWeight: 500,
                                color: '#0F172A',
                                lineHeight: 1.2,
                                mb: 1,
                            }}
                        >
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography sx={{ color: '#64748B', mb: 3.5, fontSize: 15, lineHeight: 1.6 }}>
                                {subtitle}
                            </Typography>
                        )}
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
