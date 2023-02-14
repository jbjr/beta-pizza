import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import * as Realm from "realm-web";
import {Box, Button, CircularProgress, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";

export default function BlankPage(){

    const navigate = useNavigate();

    useEffect(() => {
        const app = Realm.App.getApp('application-0-ctrvo');
        const user = app.currentUser;
        const timer = setTimeout(() => {
            navigate('/main/' + user.id);
        }, 3000); // 5000 milliseconds = 5 seconds
        return () => clearTimeout(timer);
    }, []);

    return(
        <Grid container sx={{justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundImage: 'url(/bgimage.jpg)', backgroundSize: "cover"}}>
            <Box sx={{backgroundColor: 'white', borderRadius: '16px', boxShadow: 10, border: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <LocalPizzaIcon sx={{height: 100, width: 100, my: 2}}/>
                <CircularProgress sx={{color: 'black'}}/>
                <Typography sx={{m: 2}}>Verifying login information.</Typography>
                <Typography sx={{m: 2}}>If you are not automatically redirected in a few seconds, reload this page.</Typography>
            </Box>
        </Grid>
    )
}