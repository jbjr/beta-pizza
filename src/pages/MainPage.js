import * as Realm from "realm-web";
import {getPizzaCollection} from "../comp/helper";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import PizzaCards from "../comp/PizzaCards";
import NewOrderDialog from "../comp/NewOrderDialog";


export default function MainPage() {


    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;
    console.log(user.profile.email);

    const [pizzaHolder, setPizzaHolder] = useState([]);

    useEffect(() => {
        getEntireCollection();

    }, []);

    async function getEntireCollection (){
        try{
            const pizzaCollection = getPizzaCollection(user);
            const result = await pizzaCollection.find({});
            console.log(result);
            const pizzas =[];
            result.forEach(pizza => {
                pizzas.push({name: pizza.name, price: pizza.price, desc: pizza.desc, img: pizza.img, item_id: pizza.item_id});
            })
            console.log(pizzas);
            setPizzaHolder(pizzas);

        }catch (error){
            console.log("Error", error);
        }
    }

    return(
        <Box>
            <Box sx={{backgroundColor: '#d7ccc8', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <NewOrderDialog/>
                <PizzaCards items={pizzaHolder}/>
            </Box>
        </Box>
    )
};