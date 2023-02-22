import {Alert, Card, CardActions, CardContent, CardMedia, Snackbar, Toolbar, Tooltip, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useState} from "react";
import {getOrdersCollection, getPizzaCollection} from "./helper";
import * as Realm from "realm-web";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import HeaderBar from "./HeaderBar";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function PizzaCards({items}){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    const [snack, setSnackOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const [selectedId, setSelectedId] = useState();

    const handleQtyChange = (id, event) => {
        setSelectedId(id);
        setQuantity(event.target.value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway'){
            return;
        }
        setSnackOpen(false);
    }

    async function addToOrder(event){
        const item = event.target.value;
        console.log('The button works from another page!');
        console.log('This is the item id for the button: ', item);
        const pizzaCollection = getPizzaCollection(user);
        const pizzaChoice = await pizzaCollection.findOne({item_id: item});
        const itemStorage = [];
        itemStorage.push({name: pizzaChoice.name, price: pizzaChoice.price});

        const query = {
            "user_id": user.id,
            "status": "pending"
        };
        const update ={
            "$push": {
                "item": {
                    "name": pizzaChoice.name,
                    "price": pizzaChoice.price,
                    "qty": quantity,
                    "item_id": pizzaChoice.item_id
                }
            }
        }
        const orderCollection = getOrdersCollection(user);
        const result = await orderCollection.updateOne(query, update);
        console.log(user.id);
        if (result.modifiedCount === 1){
            setSnackOpen(true);
            console.log('Modified the record')
        }
        setQuantity(1);
        console.log(result);
        console.log("Quantity: ", quantity);
    }

    return(
        <Box>
            <HeaderBar/>
            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                {items.map(pizza => (
                    <Card sx={{width: 300, m: 2, borderRadius: '10px', boxShadow: 10, backgroundColor: '#f9f9f9'}} key={pizza.item_id}>
                        <CardMedia sx={{height: 150}} image={pizza.img}/>
                        <CardContent sx={{height: 150}}>
                            <Typography variant={'h5'} sx={{color: 'black', fontWeight: 'bold'}}>{pizza.name}</Typography>
                            <Typography variant={'caption'} sx={{color: 'black'}}>{pizza.price}</Typography>
                            <Typography variant={'body2'} sx={{color: 'black'}}>{pizza.desc}</Typography>
                        </CardContent>
                        <CardActions sx={{height: 40}}>
                            <Button onClick={addToOrder} value={pizza.item_id} sx={{fontWeight: 'bold'}}>Add to Order!</Button>
                            <Select sx={{width: 100, height: 30, ml: 2}} value={selectedId === pizza.item_id ? quantity : 1} label="Qty"
                                    onChange={(e) => handleQtyChange(pizza.item_id, e)}>
                                <MenuItem value={1}>One</MenuItem>
                                <MenuItem value={2}>Two</MenuItem>
                                <MenuItem value={3}>Three</MenuItem>
                            </Select>
                        </CardActions>
                    </Card>
                ))}
                <Snackbar open={snack} autoHideDuration={1000} onClose={handleClose}>
                    <Alert variant={"filled"} severity="success" sx={{ width: '100%', fontWeight: 'bold'}}>
                        Pizza was successfully added to your cart!
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    )
}