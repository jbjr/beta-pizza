import {useEffect, useState} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import * as Realm from "realm-web";
import {useNavigate} from "react-router-dom";

export default function Login() {

    // email gets assigned a blank value
    // useState allows us to easily change the value of email with setEmail
    const [email, setEmail] = useState('');

    // password gets assigned a blank value
    // useState allows us to easily change the value of password with setEmail
    const [password, setPassword] = useState('');

    // Realm.App is used to create an instance of our app that is
    // connected to the MongoDB Atlas Cluster we are using
    // app can now be used to call Realm SDK functions
    // app can now be initialized across all Components using Realm.App.getApp('just the string')
    const app = new Realm.App({id: 'application-0-ctrvo'});

    // This function is being called in a text field to
    // process a change in value for our email variable
    // When the text field changes from blank (or whatever else)
    // this function assigns the current text to 'email'
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    // This function is being called in a text field to process a
    // change in value for our password variable
    // When the text field changes from blank (or whatever else)
    // this function assigns the current text to 'password'
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    // navigate is declared to pass an
    // instance of useNavigate() anywhere we might need it
    // useNavigate() must be assigned to a variable because Hooks can't be
    // used in conditionals, loops, or nested functions
    const navigate = useNavigate();

    // A note on the const assignments:
    // It is assumed they can't be redeclared or reassigned
    // and that assumption is true except when a constant is an Object or Array.
    // This makes const's very useful in programs built using components that
    // utilize many nested functions in each component we build


    // This function handles the click of the button that reads 'Login'
    // The variable credentials is assigned a value
    // using the built-in emailPassword function from Realm
    // This function has to be asynchronous since a
    // call to the server is being made to verify credentials
    // Try/catch is not necessary because a const
    // variable can still be initialized on an await call, but
    // it helps for validation to move on to the
    // next page which will eventually be 'authorized only'
    // After success in the 'try' block,
    // 'navigate' is used to provide a route to the next page which
    // in this case is /first-private
    // If login fails, throw an error
    async function handleClick(){
        const credentials = Realm.Credentials.emailPassword(
            email,
            password
        );
        try{
            const user = await app.logIn(credentials);
            console.assert(user.id === app.currentUser.id);
            console.log(user.profile);
        }catch(err){
            console.error("Failed to log in", err);
        }
        navigate('/main');
    }

    //This was needed to help clear local and session storage because
    // as I was testing with multiple accounts, I would delete and register then local
    // or session storage would cause issues switching users
    // This should now clear all browser data everytime to avoid multiple users sharing the same access point
    /*useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
    }, []);*/

    function signupClick(){
        navigate('/signup');
    }

    // This is all the front-end that is rendered by React
    // The logic above is tied to it directly through...
    // onChange, onClick, and value assignments
    return (
        <Grid container justifyContent={"center"} alignItems={"center"} sx={{height: '100vh', backgroundColor: '#d7ccc8', backgroundSize: "cover"}}>
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
        </Grid>
    );
}