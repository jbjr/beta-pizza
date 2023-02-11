import {Dialog, Typography} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as Realm from "realm-web";
import MyChart from "../comp/charts/MyChart";
import PriceOfPizzaChart from "../comp/charts/PriceOfPizzaChart";
import OrdersPerUserChart from "../comp/charts/OrdersPerUserChart";
import PizzaOrderFrequencyChart from "../comp/charts/PizzaOrderFrequencyChart";
import SalesDOWChart from "../comp/charts/SalesDOWChart";
import SalesDOYChart from "../comp/charts/SalesDOYChart";
import TrendUserDOYChart from "../comp/charts/TrendUserDOYChart";

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


            <OrdersPerUserChart/>
            <SalesDOWChart/>
            <SalesDOYChart/>

            <PizzaOrderFrequencyChart/>
            <TrendUserDOYChart/>
            <PriceOfPizzaChart/>

            <MyChart/>
            <MyChart/>
        </Box>
    )
};