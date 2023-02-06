import * as Realm from "realm-web";
import React, {useEffect} from "react";
import {getOrdersCollection} from "../comp/helper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function PaymentConfirmedPage(){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    useEffect(() => {
        updateStatusComplete();

    }, []);

    async function updateStatusComplete(){
        const orderCollection = getOrdersCollection(user);
        const query = {
            "user_id": user.id,
            "status": "confirmed",

        };
        const update ={
            "$set":{
                "status": "paid",
                "status_date": new Date()
            }
        }
        const result = await orderCollection.findOne(query);
        console.log(result);

        const changeStatus = await orderCollection.updateOne(query, update)
        console.log(changeStatus);
    }

    return(
        <Grid container justifyContent={"center"} alignItems={"center"}
              sx={{height: '100vh', backgroundImage: 'url(/bgimage.jpg)', backgroundSize: "cover"}}>
            <Box sx={{p: 2, bgcolor: 'white', borderRadius: '16px', boxShadow: 10, border: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <LocalPizzaIcon sx={{height: 100, width: 100, mt: 2}}/>
                <Typography sx={{mb: 2}}>Your Order is Complete!</Typography>
                <Typography>Click the button below to return to Login screen to start a new order!</Typography>
                <Button href={'/'} sx={{my: 2}} variant={"contained"} color={"success"}>Back to Login!</Button>
            </Box>
        </Grid>
    )
}