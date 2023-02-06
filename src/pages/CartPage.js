import * as Realm from "realm-web";
import {useEffect, useState} from "react";
import {getOrdersCollection} from "../comp/helper";
import Box from "@mui/material/Box";
import OrderList from "../comp/OrderList";

export default function CartPage(){

    const app = Realm.App.getApp('application-0-ctrvo');

    const user = app.currentUser;

    console.log(user);

    const[currentOrder, setOrder] = useState([]);
    const[userId, setId] = useState('');
    const[cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        getUserOrderInformation();
    }, []);

    async function getUserOrderInformation(){
        const orderCollection = getOrdersCollection(user);
        const query = {
            "user_id": user.id,
            "status": "pending"
        };
        const result = await orderCollection.findOne(query);
        console.log(result);
        const orderItems = [];
        let total = 0;
        let arrIndex = 0;
        console.log(total);
        const firstUpdate = await orderCollection.updateOne(query, {$set: {total: total}})
        result.item.forEach(orderItem => {
            orderItems.push({name: orderItem.name, price: orderItem.price, quantity: orderItem.qty, rowId: arrIndex})
            total = total + (orderItem.price * orderItem.qty);
            arrIndex = arrIndex + 1;
        })
        let roundedTotal = parseFloat(total.toFixed(2));
        const totalUpdate = await orderCollection.updateOne(query, {$set: {total: roundedTotal}})
        console.log(totalUpdate);
        const updated = await orderCollection.findOne(query)
        console.log(orderItems);
        console.log(updated);
        console.log(total);
        setOrder(orderItems);
        setId(result.user_id)
        setCartTotal(roundedTotal);
    }

    return(
        <Box>
            <Box sx={{height: '100vh', backgroundImage: 'url(/bgimage.jpg)', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <OrderList items={currentOrder} detailsId={userId} detailsTotal={cartTotal}/>
            </Box>
        </Box>
    )
}

