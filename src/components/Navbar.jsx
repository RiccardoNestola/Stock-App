import React from 'react';
import { AppBar, Toolbar, Typography, Switch, FormControlLabel } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function Navbar({ toggleTheme, isDarkMode }) {
    return (
        <AppBar position="static" >
            <Toolbar>
                <ShowChartIcon alt="Logo" style={{ height: 50, marginRight: 10 }} />
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    Stock
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isDarkMode}
                            onChange={toggleTheme}
                            name="themeToggle"
                            color="default"

                        />
                    }
                    label={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
                    labelPlacement="start"
                    sx={{ marginLeft: 'auto' }}
                />
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
