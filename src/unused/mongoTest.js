/*import {Box, Button, TextField} from "@mui/material";
import {App} from "realm-web";
import {Credentials} from "realm-web";
import {useState} from "react";

const temp = 'N8lzAS8o04jl3YGQ8IMjwRUjmO0RyNgUVznIarbcSrrQ8PLyXZSXNHMG7AAiGOjy';
export default function MongoTest(){

    const [token, setToken] = useState('');

    const handleChange = (event) =>{
        setToken(event.target.value);
    }

    async function handleClick(){
        await loginApiKey();
        const app = new App({id: 'application-0-ctrvo'});
        const mongo = app.currentUser.mongoClient('mongodb-atlas');
        const collection = mongo.db('temp').collection('tokens');

        const result = await collection.findOne({});

        //This works to return the value of the 'token' from the mongodb
        console.log(result.value);


        const test_value = result.value;
        if (test_value === token){
            console.log('Success');
            console.log(app.currentUser.id)
            const user = app.currentUser;
            console.log(user.profile);
        }else{
            console.log('Fail');
            setToken('');
        }
    }
    async function loginApiKey(){
        const app = new App({id: 'application-0-ctrvo'});
        const credentials = Credentials.apiKey('N8lzAS8o04jl3YGQ8IMjwRUjmO0RyNgUVznIarbcSrrQ8PLyXZSXNHMG7AAiGOjy');
        try{
            const user = await app.logIn(credentials);
            console.assert(user.id === app.currentUser.id);
            return user;
        }catch(err){
            console.error("Failed to log in", err);
        }
    }



    return(
        <Box>
            <TextField onChange={handleChange} value={token} id={"outlined-basic"} label={"Enter Token"} variant={"outlined"}></TextField>
            <Button onClick={handleClick}>Test the connection</Button>

        </Box>

    )
}*/
