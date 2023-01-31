import * as Realm from "realm-web";
import {useEffect, useState} from "react";
import {getOrdersCollection} from "../comp/helper";
import Box from "@mui/material/Box";
import NewOrderDialog from "../comp/NewOrderDialog";
import PizzaCards from "../comp/PizzaCards";
import OrderList from "../comp/OrderList";


export default function CartPage(){
    //Connect to the App
    // getApp() is a built in realm function
    const app = Realm.App.getApp('application-0-ctrvo');

    //Get the current user
    // currentUser is a built in realm function
    const user = app.currentUser;

    //Log the current user in the browser console
    console.log(user);

    // currentOrder will hold the order we want in the cart
    // setOrder will utilize useState() to populate currentOrder
    const[currentOrder, setOrder] = useState([]);
    const[userId, setId] = useState('');
    const[cartTotal, setCartTotal] = useState(0);

    // Need useEffect() to render info for CartList component
    useEffect(() => {
        getUserOrderInformation();
    }, []);

    // Function that grabs currentOrder information from database
    async function getUserOrderInformation(){
        const orderCollection = getOrdersCollection(user);
        const result = await orderCollection.findOne({status: "cart-test"});
        console.log(result);
        const orderItems = [];
        let total = 0;
        const firstUpdate = await orderCollection.updateOne({status: "cart-test"}, {$inc: {total: total}})
        result.item.forEach(orderItem => {
            orderItems.push({name: orderItem.name, price: orderItem.price})
            total = total + orderItem.price;
        })
        const totalUpdate = await orderCollection.updateOne({status: "cart-test"}, {$inc: {total: total}})
        console.log(totalUpdate);
        const updatedTotal = await orderCollection.findOne({status: "cart-test"})
        //nonArrItems.push({user_id: result.user_id, total: updatedTotal});
        console.log(orderItems);
        setOrder(orderItems);
        setId(result.user_id)
        setCartTotal(total);
    }

    return(
        <Box>
            <Box sx={{backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <OrderList items={currentOrder} detailsId={userId} detailsTotal={cartTotal}/>
            </Box>
        </Box>
    )
}

