import { AddOutlined, AutoStoriesOutlined, CloseRounded, DeleteOutline, SearchOutlined } from '@mui/icons-material'
import { Box, Button, Drawer, InputAdornment, List, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { SideBarItem } from './SideBarItem';
import { startDeletingNotes, startNewNote } from '../../store/journal/thunks';
import { groupNotesByDate } from '../../helpers';

export const SideBar = ({ drawerWidth = 280, mobileOpen = false, onCloseMobile }) => {

    const dispatch = useDispatch();
    const { displayName } = useSelector(state => state.auth);
    const { notes, isSaving } = useSelector(state => state.journal)
    const [search, setSearch] = useState('');
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const firstName = displayName?.split(' ')[0] || 'Tú';
    const initial = (displayName || 'J').charAt(0).toUpperCase();

    const filteredNotes = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return notes;

        return notes.filter((note) => {
            const title = (note.title || '').toLowerCase();
            const body = (note.body || '').toLowerCase();
            return title.includes(query) || body.includes(query);
        });
    }, [notes, search]);

    const noteGroups = useMemo(
        () => groupNotesByDate(filteredNotes),
        [filteredNotes]
    );

    const filteredIds = useMemo(
        () => filteredNotes.map((note) => note.id),
        [filteredNotes]
    );

    const allFilteredSelected =
        filteredIds.length > 0 && filteredIds.every((id) => selectedIds.includes(id));

    useEffect(() => {
        setSelectedIds((prev) => prev.filter((id) => notes.some((note) => note.id === id)));
    }, [notes]);

    const exitSelectionMode = () => {
        setSelectionMode(false);
        setSelectedIds([]);
    }

    const onClickNewNote = () => {
        if (selectionMode) exitSelectionMode();
        dispatch(startNewNote());
        onCloseMobile?.();
    }

    const onToggleSelect = (noteId) => {
        setSelectedIds((prev) => (
            prev.includes(noteId)
                ? prev.filter((id) => id !== noteId)
                : [...prev, noteId]
        ));
    }

    const onToggleSelectAll = () => {
        if (allFilteredSelected) {
            setSelectedIds((prev) => prev.filter((id) => !filteredIds.includes(id)));
            return;
        }

        setSelectedIds((prev) => [...new Set([...prev, ...filteredIds])]);
    }

    const onDeleteSelected = async () => {
        if (selectedIds.length === 0) return;

        const count = selectedIds.length;
        const result = await Swal.fire({
            title: count === 1 ? '¿Eliminar 1 nota?' : `¿Eliminar ${count} notas?`,
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F87171',
            cancelButtonColor: '#64748B',
            confirmButtonText: count === 1 ? 'Sí, eliminar' : `Eliminar ${count}`,
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        await dispatch(startDeletingNotes(selectedIds));
        exitSelectionMode();
    }

    const drawerContent = (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(180deg, #0B1220 0%, #152038 100%)',
                color: 'white',
            }}
        >
            <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 3 }}>
                    <Box
                        sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 1.5,
                            display: 'grid',
                            placeItems: 'center',
                            background: 'rgba(201,169,110,0.16)',
                            border: '1px solid rgba(201,169,110,0.35)',
                        }}
                    >
                        <AutoStoriesOutlined sx={{ color: '#E8D5A8', fontSize: 22 }} />
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: '"Fraunces", serif',
                            fontWeight: 600,
                            fontSize: 20,
                            letterSpacing: 0.3,
                        }}
                    >
                        Journal
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(201,169,110,0.2)',
                            color: '#E8D5A8',
                            display: 'grid',
                            placeItems: 'center',
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {initial}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                            Hola de nuevo
                        </Typography>
                        <Typography noWrap sx={{ fontWeight: 600, fontSize: 15 }}>
                            {firstName}
                        </Typography>
                    </Box>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddOutlined />}
                    onClick={onClickNewNote}
                    disabled={isSaving || selectionMode}
                    sx={{
                        py: 1.1,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: 15,
                        boxShadow: 'none',
                        backgroundColor: '#C9A96E',
                        color: '#0F172A',
                        '&:hover': {
                            backgroundColor: '#D4B87A',
                            boxShadow: 'none',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: 'rgba(201,169,110,0.35)',
                            color: 'rgba(15, 23, 42, 0.5)',
                        },
                    }}
                >
                    Nueva nota
                </Button>

                <TextField
                    value={search}
                    onChange={({ target }) => setSearch(target.value)}
                    placeholder="Buscar en tus notas..."
                    fullWidth
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlined sx={{ color: 'rgba(255,255,255,0.35)', fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        mt: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            color: 'white',
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.1)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(201,169,110,0.4)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgba(201,169,110,0.7)',
                            },
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: 'rgba(255,255,255,0.35)',
                            opacity: 1,
                        },
                    }}
                />

                {notes.length > 0 && (
                    <Box
                        sx={{
                            mt: 1.75,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1,
                        }}
                    >
                        <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>
                            {selectionMode
                                ? `${selectedIds.length} seleccionada${selectedIds.length === 1 ? '' : 's'}`
                                : `${notes.length} nota${notes.length === 1 ? '' : 's'}`}
                        </Typography>

                        <Button
                            size="small"
                            onClick={() => {
                                if (selectionMode) exitSelectionMode();
                                else setSelectionMode(true);
                            }}
                            disabled={isSaving}
                            sx={{
                                minWidth: 0,
                                px: 1.25,
                                py: 0.4,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: 13,
                                borderRadius: 1.5,
                                color: selectionMode ? '#F87171' : '#E8D5A8',
                                backgroundColor: selectionMode
                                    ? 'rgba(248,113,113,0.12)'
                                    : 'rgba(201,169,110,0.12)',
                                '&:hover': {
                                    backgroundColor: selectionMode
                                        ? 'rgba(248,113,113,0.18)'
                                        : 'rgba(201,169,110,0.18)',
                                },
                            }}
                        >
                            {selectionMode ? 'Cancelar' : 'Seleccionar'}
                        </Button>
                    </Box>
                )}
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto', px: 1.25, pb: selectionMode ? 12 : 2 }}>
                {notes.length === 0 ? (
                    <Box sx={{ px: 1.5, py: 3 }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>
                            Aún no hay páginas. Empieza con tu primera nota.
                        </Typography>
                    </Box>
                ) : filteredNotes.length === 0 ? (
                    <Box sx={{ px: 1.5, py: 3 }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>
                            No hay notas que coincidan con “{search.trim()}”.
                        </Typography>
                    </Box>
                ) : (
                    noteGroups.map((group) => (
                        <Box key={group.key} sx={{ mb: 2 }}>
                            <Typography
                                sx={{
                                    px: 1.25,
                                    mb: 1,
                                    fontSize: 11,
                                    letterSpacing: 0.8,
                                    textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.38)',
                                }}
                            >
                                {group.label}
                            </Typography>
                            <List disablePadding>
                                {group.notes.map((note) => (
                                    <SideBarItem
                                        key={`${group.key}-${note.id}`}
                                        {...note}
                                        onSelect={onCloseMobile}
                                        selectionMode={selectionMode}
                                        selected={selectedIds.includes(note.id)}
                                        onToggleSelect={onToggleSelect}
                                    />
                                ))}
                            </List>
                        </Box>
                    ))
                )}
            </Box>

            {selectionMode && (
                <Box
                    sx={{
                        position: 'sticky',
                        bottom: 0,
                        px: 2,
                        py: 1.75,
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        background: 'linear-gradient(180deg, rgba(11,18,32,0.92) 0%, #0B1220 100%)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1, mb: 1.25 }}>
                        <Button
                            fullWidth
                            size="small"
                            onClick={onToggleSelectAll}
                            disabled={filteredIds.length === 0 || isSaving}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: 13,
                                borderRadius: 2,
                                color: '#E8D5A8',
                                border: '1px solid rgba(201,169,110,0.35)',
                                '&:hover': {
                                    backgroundColor: 'rgba(201,169,110,0.1)',
                                },
                            }}
                        >
                            {allFilteredSelected ? 'Quitar todas' : 'Elegir todas'}
                        </Button>
                        <Button
                            size="small"
                            onClick={exitSelectionMode}
                            disabled={isSaving}
                            sx={{
                                minWidth: 42,
                                borderRadius: 2,
                                color: 'rgba(255,255,255,0.7)',
                                border: '1px solid rgba(255,255,255,0.12)',
                            }}
                        >
                            <CloseRounded fontSize="small" />
                        </Button>
                    </Box>

                    <Button
                        fullWidth
                        startIcon={<DeleteOutline />}
                        onClick={onDeleteSelected}
                        disabled={selectedIds.length === 0 || isSaving}
                        sx={{
                            py: 1.1,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: 14,
                            color: 'white',
                            backgroundColor: '#F87171',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#EF4444',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(248,113,113,0.28)',
                                color: 'rgba(255,255,255,0.45)',
                            },
                        }}
                    >
                        {selectedIds.length === 0
                            ? 'Eliminar seleccionadas'
                            : selectedIds.length === 1
                                ? 'Eliminar 1 nota'
                                : `Eliminar ${selectedIds.length} notas`}
                    </Button>
                </Box>
            )}
        </Box>
    )

    return (
        <Box
            component='nav'
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
            <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={onCloseMobile}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        border: 'none',
                    }
                }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        border: 'none',
                    }
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    )
}
