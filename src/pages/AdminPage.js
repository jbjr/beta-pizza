import {Dialog, Typography} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as Realm from "realm-web";
import MyChart from "../comp/MyChart";

export default function AdminPage(){

    const app = Realm.App.getApp('application-0-ctrvo');

    const [open, setOpen] = useState(true);

    const [adminKey, setAdminKey] = useState('');

    const handleChange = (event) => {
        setAdminKey(event.target.value);
    }

    async function handleClose () {
        //setAdminKey(adminKey);
        const credentials = Realm.Credentials.apiKey(adminKey);
        try {
            const user = await app.logIn(credentials);
            console.assert(user.id === app.currentUser.id);
            console.log(user);
            setOpen(false);
            //return user;
        } catch (err) {
            alert("That is not a valid key")
            console.error("Failed to log in", err);
            console.log("Could not sign in, try again.")
        }
    }

    return(
        <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <Box sx={{height: 500, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                    <Typography variant={'h5'}>Admin Verification</Typography>
                    <TextField onChange={handleChange} sx={{width: '300', m: 3}} value={adminKey} label="Admin Key" variant="outlined"></TextField>
                    <Button variant={"contained"} onClick={handleClose}>Continue</Button>
                </Box>

            </Dialog>
            <MyChart/>
            <MyChart/>
            <MyChart/>
            <MyChart/>
            <MyChart/>
            <MyChart/>
            <MyChart/>
        </Box>
    )
};