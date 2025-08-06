import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Grid, Typography } from '@mui/material'

export const NavBar = ({ drawerWidth = 280 }) => {
    return (
        <AppBar
            position='fixed'
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{ mr: 2, display: { sm: 'block', md: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: '100%' }}
                >
                    <Typography variant="h6" noWrap component="div">
                        Registro diario
                    </Typography>

                    <IconButton color="error">
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}