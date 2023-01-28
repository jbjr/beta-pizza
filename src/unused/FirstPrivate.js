import {Box, Button, Stack, Typography} from "@mui/material";
import * as Realm from "realm-web";
import {getPizzaCollection, getOrdersCollection} from "../comp/helper";

export default function FirstPrivate(){

    const app = Realm.App.getApp('application-0-ctrvo');

    const user = app.currentUser;

    //const navigate = useNavigate();

    const theAtw = '1';
    const daBomb = '2';
    const mauiMagic = '3';

    //const navId = user.id;

    function handleClick(){
        console.log('The ID for the current user is: ', user.id);
        console.log('The email for the current user is: ', user.profile.email);
        console.log('Status of user account: ', app.currentUser.state);
        console.log('Return true if the current user is logged-in: ', user.isLoggedIn);
        //console.log(app.currentUser.isLoggedIn);
    }

    async function handleSignOut() {
        try{
            await app.currentUser.logOut();
            console.log(app.currentUser.isLoggedIn);
        }catch(err){
            console.log(err);
        }
    }

    function handleAllAuthUsers(){
        const authenticatedUsers = Object.values(app.allUsers).filter(
            (user) => user.isLoggedIn
        );
        console.log(authenticatedUsers);
        console.log(authenticatedUsers.length);

    }

    async function removeCurrentUser(){
        const user = app.currentUser;
        await app.removeUser(user);
        console.log(app.currentUser);
    }

    function clearSession(){
        sessionStorage.clear();
        localStorage.clear();
    }

    //Area to test order buttons
    const orderItemStorage = [];

    async function orderItem (event) {
        const item = event.target.value;
        console.log(item);
        const pizzaCollection = getPizzaCollection(user);
        const result = await pizzaCollection.findOne({item_id: item});
        console.log('Name of pizza added to order: ', result.name);
        console.log('Price of pizza added to order: ', result.price);

        //If adding push in here, need to have variables to temp store the objects being pushed

        orderItemStorage.push({name: result.name, price: result.price});
    }

    //Need to find a way to only allow each UserID to have a max of 1 pending and 1 submitted
    //Once order status is updated to completed then update inventory to reflect changes for toppings qty based on pizza
    //submitOrder will submit
    //Should be able to start a new order with just user_id: user.id, total: 0, status: pending
    //Push new items using orderItem function in to item array for order using...
    // await orderCollection.updateOne{"$push": {"item" : Array of Object}}
    async function submitOrder(event){
        const orderCollection = getOrdersCollection(user);
        const newOrder = {
            "user_id": user.id,
            "item": orderItemStorage,
            "total": 0,
            "status": "pending"
        }
        const result = await orderCollection.insertOne(newOrder);
        console.log(result);
    }

    function showOrderArr(){
        console.log(orderItemStorage);
    }

    async function showOrderSaved(event){
        const query = {
            user_id: user.id,
            status: "test"
        };
        const orderCollection = getOrdersCollection(user);
        const result = await orderCollection.findOne(query);
        console.log('Order Details:   ');
        console.log('UserID:          ', result.user_id);
        console.log('Email:           ', user.profile.email);
        console.log('Line Items:      ', result.item);
        console.log('Status:          ', result.status);
    }


    return(
        <Box sx={{justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant={"h4"} sx={{textAlign: 'center'}}>Buttons to test user tracking.</Typography>
            <Stack sx={{border: 'solid', backgroundColor: '#e6ee9c'}}>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={handleClick}>Show the current user in the console</Button>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={handleSignOut}>Add custom user data</Button>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={handleAllAuthUsers}>Show Users currently signed in</Button>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={removeCurrentUser}>Remove Current User</Button>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={clearSession}>Clear Session Storage</Button>
            </Stack>
            <Typography variant={"h4"} sx={{textAlign: 'center'}}>Buttons select pizza from DB.</Typography>
            <Stack sx={{border: 'solid', backgroundColor: '#ffe082'}}>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={orderItem} value={theAtw}>Order - The ATW</Button>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={orderItem} value={daBomb}>Order - Da Bomb</Button>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={orderItem} value={mauiMagic}>Order - Maui Magic</Button>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={submitOrder}>Submit Order - (Add all items on page to cart)</Button>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={showOrderSaved}>Show current pending order - (User cart)</Button>
                <Button sx={{my: 3, mx: 30}} variant={'contained'} onClick={showOrderArr}>Show array holding order items.</Button>
            </Stack>
            <Typography variant={"h4"} sx={{textAlign: 'center'}}>Select input test for orders.</Typography>
            <Stack sx={{border: 'solid', backgroundColor: '#ffe082'}}>

            </Stack>
        </Box>
    )
}