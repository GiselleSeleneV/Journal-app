import { AddOutlined, AutoStoriesOutlined } from '@mui/icons-material'
import { Box, Button, Drawer, List, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem';
import { startNewNote } from '../../store/journal/thunks';

export const SideBar = ({ drawerWidth = 280, mobileOpen = false, onCloseMobile }) => {

    const dispatch = useDispatch();
    const { displayName } = useSelector(state => state.auth);
    const { notes, isSaving } = useSelector(state => state.journal)
    const firstName = displayName?.split(' ')[0] || 'Tú';
    const initial = (displayName || 'J').charAt(0).toUpperCase();

    const onClickNewNote = () => {
        dispatch(startNewNote());
        onCloseMobile?.();
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
            <Box sx={{ px: 2.5, pt: 3, pb: 2.5 }}>
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
                    disabled={isSaving}
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
            </Box>

            <Typography
                sx={{
                    px: 2.5,
                    mb: 1,
                    fontSize: 12,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.38)',
                }}
            >
                Tus notas
            </Typography>

            <Box sx={{ flex: 1, overflowY: 'auto', px: 1.25, pb: 2 }}>
                {notes.length === 0 ? (
                    <Box sx={{ px: 1.5, py: 3 }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>
                            Aún no hay páginas. Empieza con tu primera nota.
                        </Typography>
                    </Box>
                ) : (
                    <List disablePadding>
                        {notes.map(note => (
                            <SideBarItem
                                key={note.id}
                                {...note}
                                onSelect={onCloseMobile}
                            />
                        ))}
                    </List>
                )}
            </Box>
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
