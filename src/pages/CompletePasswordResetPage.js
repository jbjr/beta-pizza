import * as Realm from "realm-web";
import {useNavigate} from "react-router-dom";
import {Box, Button, Grid, TextField} from "@mui/material";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import {useState} from "react";

export default function CompletePasswordResetPage(){

    const app = new Realm.App({id: 'application-0-ctrvo'});

    const [password, setPassword] = useState('');

    const handlePasswordChange = (event => {
        setPassword(event.target.value);
    })

    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const token = params.get("token");
    const token_id = params.get("tokenId");

    const navigate = useNavigate();

    async function handleClick(){
        console.log(password);
        console.log(token);
        console.log(token_id);
        await app.emailPasswordAuth.resetPassword({
            password: password,
            token: token,
            tokenId: token_id
        })
        alert("You have successfully updated your password. \n\n" +
            "Please login with your new password to confirm.")
        navigate('/');
    }


    return(
        <Grid container justifyContent={"center"} alignItems={"center"} sx={{height: '100vh', backgroundImage: 'url(/bgimage.jpg)', backgroundSize: "cover"}}>
            <Grid item xs={1}></Grid>
            <Grid container spacing={0} justifyContent={"center"} alignItems={"center"} sx={{height: '90vh'}}>
                <Box sx={{backgroundColor: 'white', borderRadius: '16px', boxShadow: 10, border: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <LocalPizzaIcon sx={{height: 100, width: 100, mt: 2}}/>
                    <TextField onChange={handlePasswordChange} value={password} sx={{m: 2, width: 300}} id="outlined-basic" label="New Password" variant="outlined"/>
                    <Button onClick={handleClick} sx={{m: 3}} variant={"contained"} color={"success"}>Update Password</Button>
                </Box>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    )
}