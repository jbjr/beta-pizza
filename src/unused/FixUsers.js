import * as Realm from "realm-web";
import {Button} from "@mui/material";


export default function FixUsers(){
    const app = new Realm.App({id: 'application-0-ctrvo'});

    async function getActiveUsers(){
        console.log(app.allUsers);
    }

    async function getCurrentUser(){
        console.log(app.currentUser);
    }

    async function removeUser(){
        let user = app.currentUser;
        console.log('The current user is: ', user);
        await app.removeUser(user);
        user = app.currentUser;
        console.log('Now the current user is: ', user);
    }

    return(
        <>
            <Button onClick={getActiveUsers}>Get Active Users</Button>
            <Button onClick={getCurrentUser}>Get Current User</Button>
            <Button onClick={removeUser}>Remove User</Button>
        </>

    )
}