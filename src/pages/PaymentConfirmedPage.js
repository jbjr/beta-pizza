import * as Realm from "realm-web";
import React, {useEffect} from "react";
import {getInventoryCollection, getOrdersCollection} from "../comp/helper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function PaymentConfirmedPage(){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    useEffect(() => {
        updateInventoryOnPayment();
        updateStatusComplete();

    }, []);

    async function updateInventoryOnPayment(){
        const inventoryCollection = getInventoryCollection(user);
        console.log(inventoryCollection);

        const orderCollection = getOrdersCollection(user);
        console.log(orderCollection);

        const currentOrderQuery = {
            "user_id": user.id,
            "status": "confirmed"
        }
        const removeOneUnit = {
            "$inc": {
                "units": -1
            }
        }
        const removeTwoUnits = {
            "$inc": {
                "units": -2
            }
        }
        const addOneUnit = {
            "$inc": {
                "units": 1
            }
        }
        const baseQuery = {

        }
        const meatQuery = {
            "name": "meat"
        }
        const produceQuery = {
            "name": "produce"
        }

        const result = await orderCollection.findOne(currentOrderQuery);
        console.log('Result var from updateInventory', result);

        result.item.forEach(pizza => {

                const updateAllInventoryCategories = inventoryCollection.updateMany(baseQuery, removeOneUnit);
                console.log('This is where 1 unit is being removed from each category: ', updateAllInventoryCategories);

                if(pizza.item_id === "1" || pizza.item_id === "2" || pizza.item_id === "7" || pizza.item_id === "9"){
                    console.log('Matched pizza in first set in IF block');
                    const meatUpdate = inventoryCollection.updateOne(meatQuery, removeOneUnit);
                    console.log('Removed 1 meat unit: ', meatUpdate);
                }
                else if (pizza.item_id === "4"){
                    console.log('Matched pizza number 4 in IF block');
                    const meatUpdate = inventoryCollection.updateOne(meatQuery, removeTwoUnits);
                    console.log('Removed 2 meat units: ', meatUpdate);
                }
                else if (pizza.item_id === "6"){
                    console.log('Matched pizza number 6 in IF block');
                    const meatUpdate = inventoryCollection.updateOne(meatQuery, removeTwoUnits);
                    console.log('Removed 2 meat units: ', meatUpdate);

                    const produceUpdate = inventoryCollection.updateOne(produceQuery, addOneUnit);
                    console.log('Added 1 produce back: ', produceUpdate);
                }
                else if(pizza.item_id === "8"){
                    console.log('Matched pizza number 8 in IF block');
                    const meatUpdate = inventoryCollection.updateOne(meatQuery, removeOneUnit);
                    console.log('Removed 1 meat unit: ', meatUpdate);

                    const produceUpdate = inventoryCollection.updateOne(produceQuery, addOneUnit);
                    console.log('Added 1 produce back: ', produceUpdate);
                }
                else{
                    console.log("Pizza did not need to update the inventory more than the base update.");
                }
            })
    }

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