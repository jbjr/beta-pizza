import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function AdminHeaderBar() {
    return (
        <Box sx={{boxShadow: '10', flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ADMIN DASHBOARD
                    </Typography>
                    <Button href={'/'}><ExitToAppIcon sx={{color: 'white'}}/></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}