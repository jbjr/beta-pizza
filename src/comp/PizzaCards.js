import {Alert, Card, CardActions, CardContent, CardMedia, Snackbar, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useState} from "react";
import {getOrdersCollection, getPizzaCollection} from "./helper";
import * as Realm from "realm-web";
//import HeaderBar from "./HeaderBar";




export default function PizzaCards({items}){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    //const [value, setValue] = useState();
    const [snack, setSnackOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway'){
            return;
        }
        setSnackOpen(false);
    }

    async function testClick(event){
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
                    "price": pizzaChoice.price
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
        console.log(result);
        console.log("Made it through");
    }

    return(
        <Box sx={{boxShadow: 2}}>
            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                {items.map(pizza => (
                    <Card sx={{width: 300, m: 2, borderRadius: '10px', boxShadow: 5}} key={pizza.name}>
                        <CardMedia sx={{height: 150}} image={pizza.img}/>
                        <CardContent sx={{height: 150}}>
                            <Typography variant={'h5'} sx={{color: '#5d4037', fontWeight: 'bold'}}>{pizza.name}</Typography>
                            <Typography variant={'caption'} sx={{color: '#5d4037'}}>{pizza.price}</Typography>
                            <Typography variant={'body2'} sx={{color: '#5d4037'}}>{pizza.desc}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={testClick} value={pizza.item_id} sx={{fontWeight: 'bold'}}>Add to Order!</Button>
                            <Snackbar open={snack} autoHideDuration={3000} onClose={handleClose}>
                                <Alert variant={"filled"} severity="success" sx={{ width: '100%', fontWeight: 'bold'}}>
                                    Pizza was successfully added to your cart!
                                </Alert>
                            </Snackbar>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}