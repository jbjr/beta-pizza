import {useEffect, useState} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import * as Realm from "realm-web";
import {useNavigate} from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function LoginPage() {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const app = new Realm.App({id: 'application-0-ctrvo'});

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();

    async function handleClick(){
        const credentials = Realm.Credentials.emailPassword(
            email,
            password
        );
        try{
            const user = await app.logIn(credentials);
            console.assert(user.id === app.currentUser.id);
            console.log(user.id);
            console.log(app.currentUser);
            navigate('/main/' + user.id);
        }catch(err){
            alert("LoginPage failed.\n\n" +
                "Please try to login again")
            console.error("Failed to log in", err);
        }
    }

    function signupClick(){
        navigate('/signup');
    }

    return (
        <Grid container justifyContent={"center"} alignItems={"center"} sx={{height: '100vh', backgroundImage: 'url(/bgimage.jpg)', backgroundSize: "cover"}}>
            <Grid item xs={1}></Grid>
            <Grid container spacing={0} justifyContent={"center"} alignItems={"center"} sx={{height: '90vh'}}>
                <Box sx={{backgroundColor: 'white', borderRadius: '16px', boxShadow: 10, border: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <LocalPizzaIcon sx={{height: 100, width: 100, mt: 2}}/>
                    <TextField onChange={handleEmailChange} value={email} sx={{m: 2, width: 300}} id="outlined-basic" label="Username" variant="outlined"/>
                    <TextField onChange={handlePasswordChange} value={password} sx={{m: 2, width: 300}} id="outlined-basic" label="Password" variant="outlined"/>
                    <Button onClick={handleClick} sx={{m: 3}} variant={"contained"} color={"success"}>Login</Button>
                    <Button onClick={signupClick} sx={{textTransform: 'capitalize', mb: 1}}>Create a free account!</Button>
                    <Button color={"error"} sx={{textTransform: 'capitalize', mb: 2}}>Forgot Password?</Button>
                </Box>
            </Grid>
            <Grid item xs={1}></Grid>
            <Box sx={{width: '100%', display: 'flex', alignItems: 'flex-start'}}>
                <Button sx={{color: 'black'}} href={'/admin-page'}><AdminPanelSettingsIcon/></Button>
            </Box>
        </Grid>
    );
}