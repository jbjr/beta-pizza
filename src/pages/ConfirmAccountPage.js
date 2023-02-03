import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import * as Realm from 'realm-web';

export default function ConfirmAccountPage () {

    const app = Realm.App.getApp('application-0-ctrvo');

    const navigate = useNavigate();

    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const token = params.get("token");
    const token_id = params.get("tokenId");

    console.log(token);
    console.log(token_id);

    async function clickSubmit(){
        await app.emailPasswordAuth.confirmUser({token: token, tokenId: token_id});
        alert("You have successfully authenticated your email\n\n" +
            "Please login to finish your registration.")
        navigate('/');
    }

    return(
        <Grid container justifyContent={"center"} alignItems={"center"}
              sx={{height: '100vh', backgroundColor: '#d7ccc8', backgroundSize: "cover"}}>
            <Box sx={{p: 2, bgcolor: 'white', borderRadius: '16px', boxShadow: 10, border: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <LocalPizzaIcon sx={{height: 100, width: 100, mt: 2}}/>
                <Typography>Click button below to confirm account!</Typography>
                <Button onClick={clickSubmit} sx={{my: 2}} variant={"contained"} color={"success"}>Activate!</Button>
            </Box>
        </Grid>
    )
};