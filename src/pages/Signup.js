import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import {useNavigate} from "react-router-dom";
import * as Realm from 'realm-web';


export default function Signup(){

    const app = Realm.App.getApp('application-0-ctrvo');

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleNameChange = event => {
        setName(event.target.value);
    };
    const handleEmailChange = event => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    async function clickSignup(){
        await app.emailPasswordAuth.registerUser({email, password});
        navigate('/prompt-check-email');
    }

    async function resendConfirmationEmail(){
        await app.emailPasswordAuth.resendConfirmationEmail({email});
        navigate('/prompt-check-email');
    }

    return(
        <Grid container justifyContent={"center"} alignItems={"center"} sx={{height: '100vh', backgroundColor: '#d7ccc8', backgroundSize: "cover"}}>
            <Grid item xs={1}>
            </Grid>
            <Grid container spacing={0} justifyContent={"center"} alignItems={"center"} sx={{height: '90vh'}}>
                <Box sx={{backgroundColor: 'white', borderRadius: '16px', boxShadow: 10, border: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <LocalPizzaIcon sx={{height: 100, width: 100, mt: 2}}/>
                    <TextField onChange={handleNameChange} sx={{m: 2, width: 300}} value={name} id="outlined-basic" label="Name" variant="outlined"/>
                    <TextField onChange={handleEmailChange} sx={{mb: 2, width: 300}} value={email} id="outlined-basic" label="Email" variant="outlined" helperText="This will be your username."/>
                    <TextField onChange={handlePasswordChange} sx={{mb: 2, width: 300}} value={password} id="outlined-basic" label="Password" variant="outlined" helperText="Must be 8 characters, contain letters, and contain numbers."/>
                    <Button onClick={clickSignup} sx={{mb: 2}} variant={"contained"} color={"success"}>Signup</Button>
                    <Button onClick={resendConfirmationEmail} sx={{textTransform: 'capitalize', mb: 2}}>Resend confirmation email</Button>
                </Box>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    );
}