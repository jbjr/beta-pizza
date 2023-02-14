import * as Realm from "realm-web";
import {getPizzaCollection} from "../comp/helper";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import PizzaCards from "../comp/PizzaCards";
import NewOrderDialog from "../comp/NewOrderDialog";
import {useNavigate} from "react-router-dom";


export default function MainPage({user}) {


    const app = Realm.App.getApp('application-0-ctrvo');
    const curUser = app.currentUser;

    const [pizzaHolder, setPizzaHolder] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadPizzaCards();

    }, []);

    async function loadPizzaCards (){
        try{
            const pizzaCollection = getPizzaCollection(curUser);
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
            <Box sx={{minHeight: '100vh', backgroundColor: '#d7ccc8', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <NewOrderDialog/>
                <PizzaCards items={pizzaHolder}></PizzaCards>
            </Box>
        </Box>
    )
};