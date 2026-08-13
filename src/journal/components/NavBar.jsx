import { AutoStoriesOutlined, LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth/thunks';

export const NavBar = ({ drawerWidth = 280, onToggleDrawer }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout())
    }

    return (
        <AppBar
            position='fixed'
            elevation={0}
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                backgroundColor: 'rgba(250, 247, 242, 0.86)',
                backdropFilter: 'blur(16px)',
                color: '#0F172A',
                borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
            }}
        >
            <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }}>
                <IconButton
                    color='inherit'
                    edge='start'
                    onClick={onToggleDrawer}
                    sx={{ mr: 1.5, display: { md: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexGrow: 1, minWidth: 0 }}>
                    <Box
                        sx={{
                            display: { xs: 'grid', md: 'none' },
                            width: 34,
                            height: 34,
                            borderRadius: 1.5,
                            placeItems: 'center',
                            backgroundColor: '#0F172A',
                            flexShrink: 0,
                        }}
                    >
                        <AutoStoriesOutlined sx={{ color: '#E8D5A8', fontSize: 20 }} />
                    </Box>
                    <Typography
                        noWrap
                        sx={{
                            fontFamily: '"Fraunces", serif',
                            fontSize: { xs: 18, sm: 22 },
                            fontWeight: 500,
                        }}
                    >
                        Registro diario
                    </Typography>
                </Box>

                <Button
                    onClick={onLogout}
                    startIcon={<LogoutOutlined />}
                    sx={{
                        textTransform: 'none',
                        color: '#64748B',
                        fontWeight: 600,
                        borderRadius: 2,
                        px: { xs: 1, sm: 1.75 },
                        minWidth: { xs: 40, sm: 'auto' },
                        '& .MuiButton-startIcon': {
                            mr: { xs: 0, sm: 0.75 },
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(15, 23, 42, 0.05)',
                            color: '#0F172A',
                        },
                    }}
                >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        Salir
                    </Box>
                </Button>
            </Toolbar>
        </AppBar>
    )
}
