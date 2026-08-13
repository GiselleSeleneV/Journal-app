import { useState } from 'react'
import { Box, Toolbar } from '@mui/material'
import { NavBar, SideBar } from '../components';

const drawerWidth = 300;

export const JournalLayout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const onToggleDrawer = () => setMobileOpen((prev) => !prev);
    const onCloseDrawer = () => setMobileOpen(false);

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #FAF7F2 0%, #F3EEE6 100%)',
                backgroundAttachment: 'fixed',
            }}
            className='animate__animated animate__fadeIn anime__faster'
        >
            <NavBar
                drawerWidth={drawerWidth}
                onToggleDrawer={onToggleDrawer}
            />

            <SideBar
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                onCloseMobile={onCloseDrawer}
            />

            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, md: 3 },
                    minWidth: 0,
                    background: 'transparent',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}
