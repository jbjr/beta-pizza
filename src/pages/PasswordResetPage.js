import {Box, Button, Grid, TextField} from "@mui/material";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {useState} from "react";
import * as Realm from "realm-web";
import {useNavigate} from "react-router-dom";


export default function PasswordResetPage(){

    const app = new Realm.App({id: 'application-0-ctrvo'});

    const [email, setEmail] = useState('');

    const handleEmailChange = (event => {
        setEmail(event.target.value);
    })

    const navigate = useNavigate();

    async function handleClick(){
        console.log(email);
        await app.emailPasswordAuth.sendResetPasswordEmail({email});
        navigate('/prompt-check-email-reset');
    }


    return(
        <Grid container justifyContent={"center"} alignItems={"center"} sx={{height: '100vh', backgroundImage: 'url(/bgimage.jpg)', backgroundSize: "cover"}}>
            <Grid item xs={1}></Grid>
            <Grid container spacing={0} justifyContent={"center"} alignItems={"center"} sx={{height: '90vh'}}>
                <Box sx={{backgroundColor: 'white', borderRadius: '16px', boxShadow: 10, border: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <LocalPizzaIcon sx={{height: 100, width: 100, mt: 2}}/>
                    <TextField onChange={handleEmailChange} value={email} sx={{m: 2, width: 300}} id="outlined-basic" label="Email" variant="outlined"/>
                    <Button onClick={handleClick} sx={{m: 3}} variant={"contained"} color={"success"}>Reset Password</Button>
                </Box>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    )
}