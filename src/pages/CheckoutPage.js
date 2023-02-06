import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as Realm from "realm-web";
import {getOrdersCollection} from "../comp/helper";
import {useEffect, useState} from "react";
import CheckoutHeader from "../comp/CheckoutHeader";

export default function CheckoutPage(){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    const [total, setTotal] = useState();

    useEffect(() => {
        getInfo();
    }, []);

    async function getInfo(){
        const orderCollection = getOrdersCollection(user);
        const query = {
            "user_id": user.id,
            "status": "confirmed"
        };
        const result = await orderCollection.findOne(query);
        let totalPlaceholder = result.total;
        setTotal(totalPlaceholder);
        console.log(totalPlaceholder);
    }

    return(
        <Grid container justifyContent={"center"} alignItems={"center"} sx={{height: '100vh', backgroundImage: 'url(/bgimage.jpg)', backgroundSize: "cover"}}>
            <Box sx={{minHeight: 300, minWidth: 300, backgroundColor: 'white', border: 1, p: 3, borderRadius: '16px'}}>
                <CheckoutHeader user={user.id} orderTotal={total}/>
            </Box>
        </Grid>
    )
}