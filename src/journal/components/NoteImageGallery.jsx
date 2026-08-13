import { CheckRounded, CloseRounded } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { DAILY_MOMENT_IMAGES, MAX_NOTE_IMAGES } from "../data/dailyMomentImages"

const IMAGE_FALLBACK = '/image-not-found.jpg';

const handleImageError = (event) => {
    const img = event.currentTarget;
    if (img.dataset.fallbackApplied === 'true') return;

    img.dataset.fallbackApplied = 'true';
    img.src = IMAGE_FALLBACK;
    img.alt = 'Imagen no disponible';
};

export const NoteImageGallery = ({
    selectedUrls = [],
    onToggle,
    disabled = false,
}) => {
    const selectedSet = new Set(selectedUrls);

    return (
        <Box sx={{ mt: 3.5 }}>
            {selectedUrls.length > 0 && (
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: 0.6,
                            color: '#C9A96E',
                            mb: 1.5,
                            textTransform: 'uppercase',
                        }}
                    >
                        Momentos elegidos
                    </Typography>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: selectedUrls.length === 1 ? '1fr' : '1fr 1fr',
                            },
                            gap: 1.5,
                        }}
                    >
                        {selectedUrls.map((url, index) => {
                            const moment = DAILY_MOMENT_IMAGES.find((item) => item.url === url);
                            const isHero = index === 0 && selectedUrls.length !== 2;

                            return (
                                <Box
                                    key={url}
                                    className="journal-image-card"
                                    style={{ animationDelay: `${index * 0.07}s` }}
                                    sx={{
                                        position: 'relative',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        gridColumn: isHero ? { sm: '1 / -1' } : 'auto',
                                        height: isHero ? { xs: 200, sm: 240 } : { xs: 160, sm: 180 },
                                        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
                                        '&:hover': {
                                            boxShadow: '0 18px 40px rgba(15, 23, 42, 0.14)',
                                            transform: 'translateY(-3px)',
                                        },
                                        '&:hover .note-image-remove': {
                                            opacity: 1,
                                            transform: 'scale(1)',
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={url}
                                        alt={moment?.label || 'Momento del día'}
                                        onError={handleImageError}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            background:
                                                'linear-gradient(180deg, transparent 45%, rgba(15,23,42,0.55) 100%)',
                                            pointerEvents: 'none',
                                        }}
                                    />

                                    <IconButton
                                        className="note-image-remove"
                                        aria-label={`Quitar ${moment?.label || 'imagen'}`}
                                        disabled={disabled}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onToggle?.(url);
                                        }}
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            width: 32,
                                            height: 32,
                                            color: '#0F172A',
                                            backgroundColor: 'rgba(255, 255, 255, 0.92)',
                                            backdropFilter: 'blur(8px)',
                                            border: '1px solid rgba(255, 255, 255, 0.7)',
                                            boxShadow: '0 8px 20px rgba(15, 23, 42, 0.18)',
                                            opacity: { xs: 1, sm: 0.92 },
                                            transform: { xs: 'scale(1)', sm: 'scale(0.96)' },
                                            transition: 'opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: '#FFFFFF',
                                                color: '#B91C1C',
                                                boxShadow: '0 10px 24px rgba(15, 23, 42, 0.22)',
                                            },
                                        }}
                                    >
                                        <CloseRounded sx={{ fontSize: 18 }} />
                                    </IconButton>

                                    <Typography
                                        sx={{
                                            position: 'absolute',
                                            left: 14,
                                            bottom: 12,
                                            color: 'white',
                                            fontFamily: '"Fraunces", serif',
                                            fontSize: 15,
                                            fontWeight: 500,
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        {moment?.label || 'Momento'}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            )}

            <Box
                className="journal-fade-up"
                sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: 2,
                    mb: 1.5,
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontFamily: '"Fraunces", serif',
                            fontSize: 20,
                            fontWeight: 500,
                            color: '#0F172A',
                        }}
                    >
                        Momentos del día
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'rgba(15, 23, 42, 0.5)', mt: 0.35 }}>
                        Elige hasta {MAX_NOTE_IMAGES} imágenes para acompañar tu nota
                    </Typography>
                </Box>
                <Typography sx={{ fontSize: 12, color: 'rgba(15, 23, 42, 0.4)', flexShrink: 0 }}>
                    {selectedUrls.length}/{MAX_NOTE_IMAGES}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        sm: 'repeat(3, 1fr)',
                        md: 'repeat(4, 1fr)',
                    },
                    gap: 1.25,
                }}
            >
                {DAILY_MOMENT_IMAGES.map((item, index) => {
                    const isSelected = selectedSet.has(item.url);
                    const reachedLimit = selectedUrls.length >= MAX_NOTE_IMAGES && !isSelected;

                    return (
                        <Box
                            key={item.id}
                            component="button"
                            type="button"
                            className="journal-picker-card"
                            style={{ animationDelay: `${0.04 + index * 0.035}s` }}
                            disabled={disabled || reachedLimit}
                            onClick={() => onToggle?.(item.url)}
                            sx={{
                                position: 'relative',
                                border: isSelected
                                    ? '2px solid #C9A96E'
                                    : '2px solid transparent',
                                borderRadius: 2.5,
                                overflow: 'hidden',
                                p: 0,
                                cursor: disabled || reachedLimit ? 'not-allowed' : 'pointer',
                                opacity: reachedLimit ? 0.45 : 1,
                                aspectRatio: '1 / 1.1',
                                backgroundColor: 'rgba(15, 23, 42, 0.04)',
                                transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, border-color 0.25s ease',
                                boxShadow: isSelected
                                    ? '0 10px 24px rgba(201, 169, 110, 0.28)'
                                    : '0 6px 16px rgba(15, 23, 42, 0.06)',
                                '&:hover': {
                                    transform: disabled || reachedLimit ? 'none' : 'translateY(-4px)',
                                    boxShadow: disabled || reachedLimit
                                        ? undefined
                                        : '0 14px 32px rgba(15, 23, 42, 0.14)',
                                },
                                '&:focus-visible': {
                                    outline: '2px solid #C9A96E',
                                    outlineOffset: 2,
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={`${item.url}&h=400`}
                                alt={item.label}
                                loading="lazy"
                                onError={handleImageError}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />

                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: isSelected
                                        ? 'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.55) 100%)'
                                        : 'linear-gradient(180deg, transparent 40%, rgba(15,23,42,0.5) 100%)',
                                }}
                            />

                            {isSelected && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        width: 26,
                                        height: 26,
                                        borderRadius: '50%',
                                        backgroundColor: '#C9A96E',
                                        display: 'grid',
                                        placeItems: 'center',
                                        color: '#0F172A',
                                    }}
                                >
                                    <CheckRounded sx={{ fontSize: 16 }} />
                                </Box>
                            )}

                            <Typography
                                sx={{
                                    position: 'absolute',
                                    left: 10,
                                    right: 10,
                                    bottom: 10,
                                    color: 'white',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    textAlign: 'left',
                                    lineHeight: 1.25,
                                    textShadow: '0 1px 8px rgba(0,0,0,0.35)',
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
