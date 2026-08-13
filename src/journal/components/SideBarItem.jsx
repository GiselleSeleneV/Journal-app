import { DeleteOutline } from "@mui/icons-material"
import { Box, IconButton, ListItemButton, Typography } from "@mui/material"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote } from "../../store/journal"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [], onSelect }) => {

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
        dispatch(setActiveNote({ title, body, id, date, imageUrls }));
        onSelect?.();
    }

    const onDeleteNote = (event) => {
        event.stopPropagation();
        dispatch(startDeletingNote(id));
    }

    return (
        <ListItemButton
            onClick={onClickNote}
            sx={{
                mb: 0.75,
                px: 1.5,
                py: 1.25,
                borderRadius: 2,
                alignItems: 'flex-start',
                backgroundColor: isActive ? 'rgba(201,169,110,0.16)' : 'transparent',
                border: isActive
                    ? '1px solid rgba(201,169,110,0.35)'
                    : '1px solid transparent',
                '&:hover': {
                    backgroundColor: isActive
                        ? 'rgba(201,169,110,0.2)'
                        : 'rgba(255,255,255,0.05)',
                    '& .note-delete': { opacity: 1 },
                },
            }}
        >
            <Box sx={{ flex: 1, minWidth: 0, pr: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.35 }}>
                    <Typography
                        noWrap
                        sx={{
                            flex: 1,
                            fontWeight: 600,
                            fontSize: 14,
                            color: isActive ? '#E8D5A8' : 'white',
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

            <IconButton
                className="note-delete"
                edge="end"
                aria-label="eliminar nota"
                onClick={onDeleteNote}
                disabled={isSaving}
                size="small"
                sx={{
                    mt: 0.25,
                    color: 'rgba(255,255,255,0.35)',
                    opacity: { xs: 1, md: 0 },
                    transition: 'opacity 0.2s ease, color 0.2s ease',
                    '&:hover': { color: '#F87171', backgroundColor: 'rgba(248,113,113,0.12)' },
                }}
            >
                <DeleteOutline fontSize="small" />
            </IconButton>
        </ListItemButton>
    )
}
