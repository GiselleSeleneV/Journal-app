import { CheckBox, CheckBoxOutlineBlank, DeleteOutline, Star, StarBorder } from "@mui/icons-material"
import { Box, IconButton, ListItemButton, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startToggleFavorite } from "../../store/journal"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"

export const SideBarItem = ({
    title = '',
    body,
    id,
    date,
    imageUrls = [],
    isFavorite = false,
    onSelect,
    selectionMode = false,
    selected = false,
    onToggleSelect,
}) => {

    const dispatch = useDispatch();
    const { isSaving, active } = useSelector(state => state.journal);
    const isActive = active?.id === id;

    const dateLabel = useMemo(() => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
        });
    }, [date]);

    const onClickNote = () => {
        if (selectionMode) {
            onToggleSelect?.(id);
            return;
        }

        dispatch(setActiveNote({
            title: title ?? '',
            body: body ?? '',
            id,
            date,
            imageUrls,
            isFavorite,
        }));
        onSelect?.();
    }

    const onToggleFavorite = (event) => {
        event.stopPropagation();
        dispatch(startToggleFavorite(id));
    }

    const onDeleteNote = async (event) => {
        event.stopPropagation();

        const result = await Swal.fire({
            title: '¿Eliminar esta nota?',
            text: title?.trim()
                ? `"${title}" se borrará de forma permanente.`
                : 'Esta nota se borrará de forma permanente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F87171',
            cancelButtonColor: '#64748B',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            dispatch(startDeletingNote(id));
        }
    }

    return (
        <ListItemButton
            className="journal-fade-up"
            onClick={onClickNote}
            sx={{
                mb: 0.75,
                px: 1.5,
                py: 1.25,
                borderRadius: 2,
                alignItems: 'flex-start',
                gap: 1,
                backgroundColor: selected
                    ? 'rgba(248,113,113,0.14)'
                    : isActive
                        ? 'rgba(201,169,110,0.16)'
                        : 'transparent',
                border: selected
                    ? '1px solid rgba(248,113,113,0.4)'
                    : isActive
                        ? '1px solid rgba(201,169,110,0.35)'
                        : '1px solid transparent',
                transition: 'background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
                '&:hover': {
                    backgroundColor: selected
                        ? 'rgba(248,113,113,0.18)'
                        : isActive
                            ? 'rgba(201,169,110,0.2)'
                            : 'rgba(255,255,255,0.05)',
                    transform: selectionMode ? 'none' : 'translateX(2px)',
                    '& .note-actions': { opacity: 1 },
                },
            }}
        >
            {selectionMode && (
                <Box
                    sx={{
                        mt: 0.35,
                        color: selected ? '#F87171' : 'rgba(255,255,255,0.35)',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                    }}
                >
                    {selected
                        ? <CheckBox sx={{ fontSize: 22 }} />
                        : <CheckBoxOutlineBlank sx={{ fontSize: 22 }} />}
                </Box>
            )}

            <Box sx={{ flex: 1, minWidth: 0, pr: selectionMode ? 0 : 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.35 }}>
                    {!selectionMode && isFavorite && (
                        <Star sx={{ fontSize: 14, color: '#E8D5A8', flexShrink: 0 }} />
                    )}
                    <Typography
                        noWrap
                        sx={{
                            flex: 1,
                            fontWeight: 600,
                            fontSize: 14,
                            color: selected || isActive ? '#E8D5A8' : 'white',
                        }}
                    >
                        {title || 'Sin título'}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', flexShrink: 0 }}>
                        {dateLabel}
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.52)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {body || 'Empieza a escribir...'}
                </Typography>
            </Box>

            {!selectionMode && (
                <Box
                    className="note-actions"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.25,
                        opacity: { xs: 1, md: isFavorite || isActive ? 1 : 0 },
                        transition: 'opacity 0.2s ease',
                    }}
                >
                    <IconButton
                        aria-label={isFavorite ? 'Quitar de favoritos' : 'Marcar favorito'}
                        onClick={onToggleFavorite}
                        disabled={isSaving}
                        size="small"
                        sx={{
                            color: isFavorite ? '#E8D5A8' : 'rgba(255,255,255,0.35)',
                            '&:hover': {
                                color: '#E8D5A8',
                                backgroundColor: 'rgba(201,169,110,0.12)',
                            },
                        }}
                    >
                        {isFavorite ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
                    </IconButton>

                    <IconButton
                        aria-label="eliminar nota"
                        onClick={onDeleteNote}
                        disabled={isSaving}
                        size="small"
                        sx={{
                            color: 'rgba(255,255,255,0.35)',
                            '&:hover': { color: '#F87171', backgroundColor: 'rgba(248,113,113,0.12)' },
                        }}
                    >
                        <DeleteOutline fontSize="small" />
                    </IconButton>
                </Box>
            )}
        </ListItemButton>
    )
}
