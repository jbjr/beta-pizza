import * as Realm from "realm-web";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {
    getAllDataCollection,
    getAllInventoryCollection,
    getAllOrderOptionsCollection,
    getAllOrdersCollection,
    getInventoryCollection,
    getOrdersCollection, getPizzaCollection
} from "../comp/helper";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";


export default function FunctionTests(){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    const pizzaOrdered = ["1", "1", "4", "6", "3", "5", "2"];

    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalPizzas, setTotalPizzas] = useState(0);
    const [totalATW, setTotalATW] = useState(0);
    const [totalBomb, setTotalBomb] = useState(0);
    const [totalMaui, setTotalMaui] = useState(0);
    const [totalXtreme, setTotalXtreme] = useState(0);
    const [totalPollinator, setTotalPollinator] = useState(0);
    const [totalCountry, setTotalCountry] = useState(0);
    const [totalBoz, setTotalBoz] = useState(0);
    const [totalPalooza, setTotalPalooza] = useState(0);
    const [totalHurricane, setTotalHurricane] = useState(0);

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

    const reloadInventory = {
        "$set": {
            "units": 1000
        }
    }

    const baseQuery = {}

    const meatQuery = {
        "name": "meat"
    }

    const produceQuery = {
        "name": "produce"
    }

    const currentOrderQuery = {
        "user_id": user.id,
        "status": "confirmed"
    }


    async function updateInventory(){
        const inventoryCollection = getInventoryCollection(user);
        console.log(inventoryCollection);

        const result = inventoryCollection.find({});
        console.log(result);

        console.log('The length of the pizza array is:  ', pizzaOrdered.length);

        for (let x = 0; x < pizzaOrdered.length; x++){
            const updateAllInventoryCategories = inventoryCollection.updateMany(baseQuery, removeOneUnit);
            console.log('This is where 1 unit is being removed from each category: ', updateAllInventoryCategories);

            if(pizzaOrdered[x] === "1" || pizzaOrdered[x] === "2" || pizzaOrdered[x] === "7" || pizzaOrdered[x] === "9"){
                console.log('Matched pizza in first set in IF block');
                const meatUpdate = inventoryCollection.updateOne(meatQuery, removeOneUnit);
                console.log('Removed 1 meat unit: ', meatUpdate);
            }
            else if (pizzaOrdered[x] === "4"){
                console.log('Matched pizza number 4 in IF block');
                const meatUpdate = inventoryCollection.updateOne(meatQuery, removeTwoUnits);
                console.log('Removed 2 meat units: ', meatUpdate);
            }
            else if (pizzaOrdered[x] === "6"){
                console.log('Matched pizza number 6 in IF block');
                const meatUpdate = inventoryCollection.updateOne(meatQuery, removeTwoUnits);
                console.log('Removed 2 meat units: ', meatUpdate);

                const produceUpdate = inventoryCollection.updateOne(produceQuery, addOneUnit);
                console.log('Added 1 produce back: ', produceUpdate);
            }
            else if(pizzaOrdered[x] === "8"){
                console.log('Matched pizza number 8 in IF block');
                const meatUpdate = inventoryCollection.updateOne(meatQuery, removeOneUnit);
                console.log('Removed 1 meat unit: ', meatUpdate);

                const produceUpdate = inventoryCollection.updateOne(produceQuery, addOneUnit);
                console.log('Added 1 produce back: ', produceUpdate);
            }
            else{
                console.log("Pizza did not need to update the inventory more than the base update.");
            }
        }


    }

    async function resetInventory(){
        const inventoryCollection = getInventoryCollection(user);
        console.log(inventoryCollection);

        const result = inventoryCollection.find({});
        console.log(result);

        const updateInventory = inventoryCollection.updateMany(baseQuery, reloadInventory);
        console.log('Inventory was set back to 1000 units  ', updateInventory);

    }

    async function getTotalRevenue(){
        const orderCollection = getOrdersCollection(user);

        const query = {"status": "paid"};

        //let numOrders = 0;

        const result = await orderCollection.find(query);
        const count = await orderCollection.count(query);

        let revenueTotal = 0;
        let pizzaCount = 0;
        let atwCount = 0;
        let bombCount = 0;
        let mauiCount = 0;
        let xtremeCount = 0;
        let pollinatorCount = 0;
        let countryCount = 0;
        let bozCount = 0;
        let paloozaCount = 0;
        let hurricaneCount = 0;


        result.forEach(pizzas => {
            pizzas.item.forEach(pizza => {
                console.log(pizza.qty);
                pizzaCount = pizzaCount + pizza.qty;
                if (pizza.item_id === "1"){
                    atwCount = atwCount + pizza.qty;
                }
                else if (pizza.item_id === "2"){
                    bombCount = bombCount + pizza.qty;
                }
                else if (pizza.item_id === "3"){
                    mauiCount = mauiCount + pizza.qty;
                }
                else if (pizza.item_id === "4"){
                    xtremeCount = xtremeCount + pizza.qty;
                }
                else if (pizza.item_id === "5"){
                    pollinatorCount = pollinatorCount + pizza.qty;
                }
                else if (pizza.item_id === "6"){
                    countryCount = countryCount + pizza.qty;
                }
                else if (pizza.item_id === "7"){
                    bozCount = bozCount + pizza.qty;
                }
                else if (pizza.item_id === "8"){
                    paloozaCount = paloozaCount + pizza.qty;
                }
                else if (pizza.item_id === "9"){
                    hurricaneCount = hurricaneCount + pizza.qty;
                }
            })
            //console.log(pizza.item.qty);
            //pizzaCount = pizza.qty + pizzaCount;
        })

        result.forEach(total => {
            revenueTotal = revenueTotal + total.total;
            console.log(total.total);
        })

        console.log(result);
        console.log('Total revenue:  ', revenueTotal);
        console.log(count);
        console.log('Total pizzas: ', pizzaCount);
        console.log('Total ATW pizzas ordered: ', atwCount);
        setTotalRevenue(revenueTotal);
        setTotalOrders(count);
        setTotalPizzas(pizzaCount);
        setTotalATW(atwCount);
        setTotalBomb(bombCount);
        setTotalMaui(mauiCount);
        setTotalXtreme(xtremeCount);
        setTotalPollinator(pollinatorCount);
        setTotalBoz(bozCount);
        setTotalCountry(countryCount);
        setTotalPalooza(paloozaCount);
        setTotalHurricane(hurricaneCount);
    }

    const [inventoryArray, setInventoryArray] = useState([]);

    async function showInventory(){
        const inventoryCollection = getInventoryCollection(user);
        const result = await inventoryCollection.find();

        let inventoryStore = [];
        let num = 0;
        let roundedNum = 0;

        result.forEach(item => {
            num = item.cost_per_unit;
            roundedNum = num.toFixed(2);
            inventoryStore.push({name: item.name, units: item.units, cost: roundedNum})
        })

        setInventoryArray(inventoryStore);
    }

    async function copyDatabase(){
        const orderCollection = getOrdersCollection(user);
        const orderOptionsCollection = getPizzaCollection(user);
        const inventoryCollection = getInventoryCollection(user);


        const copyOrdersCollection = getAllOrdersCollection(user);
        const copyOrderOptionsCollection = getAllOrderOptionsCollection(user);
        const copyInventoryCollection = getAllInventoryCollection(user);
        const allDataCollection = getAllDataCollection(user);

        const deleteCopyOrders = await copyOrdersCollection.deleteMany({});
        const deleteCopyOrderOptions = await copyOrderOptionsCollection.deleteMany({});
        const deleteCopyInventory = await copyInventoryCollection.deleteMany({});
        const deleteAllDataCollectionItems = await allDataCollection.deleteMany({});

        console.log('Did the delete match: ', deleteCopyOrders);
        console.log('Did the delete match: ', deleteCopyOrderOptions);
        console.log('Did the delete match: ', deleteCopyInventory);
        console.log('Did the delete match: ', deleteAllDataCollectionItems);


        //const resultOrderOptions = await copyOrderOptionsCollection.find();

        ////////////////////////////////////////////////////////////////
        // Update Orders in the Complete DB
        const resultOrders = await orderCollection.find();
        let tempOrderStorage = [];

        console.log(resultOrders);

        resultOrders.forEach(item => {
            tempOrderStorage.push({
                user_id: item.user_id,
                item: item.item,
                total: item.total,
                status: item.status,
                status_date: item.status_date
            })
        })
        //const copyOrders = await copyOrdersCollection.insertMany(tempOrderStorage);
        //console.log('Display ids if successful: ', copyOrders);

        ////////////////////////////////////////////////////////////////
        // Update Order Options in the Complete DB
        const resultOrderOptions = await orderOptionsCollection.find();
        let tempOrderOptionsStorage = [];
        console.log(resultOrderOptions);
        resultOrderOptions.forEach(item => {
            tempOrderOptionsStorage.push({
                name: item.name,
                price: item.price,
                item_id: item.item_id,
                desc: item.desc
            })
        })
        //const copyOrderOptions = await copyOrderOptionsCollection.insertMany(tempOrderOptionsStorage);
        //console.log('Display ids if successful: ', copyOrderOptions);

        ////////////////////////////////////////////////////////////////
        // Update Inventory in the Complete DB
        const resultInventory = await inventoryCollection.find();
        let tempInventoryStorage = [];
        console.log(resultInventory);
        resultInventory.forEach(item => {
            tempInventoryStorage.push({
                name: item.name,
                units: item.units,
                cost_per_unit: item.cost_per_unit
            })
        })
        //const copyInventory = await copyInventoryCollection.insertMany(tempInventoryStorage);
        //console.log('Display ids if successful: ', copyInventory);

        const copyOrders = await allDataCollection.insertMany(tempOrderStorage);
        const copyInventory = await allDataCollection.insertMany(tempInventoryStorage);
        const copyOrderOptions = await allDataCollection.insertMany(tempOrderOptionsStorage);

    }

    async function addOrderCountField(){
        const orderOptionsCollection = getPizzaCollection(user);
        const queryPizza = {};
        const updatePizza = {
            "$set": {
                "total_ordered": 0
            }
        }

        const updatePizzaOrderTotal = await orderOptionsCollection.updateMany(queryPizza, updatePizza);
        console.log('Did the new field get added?', updatePizzaOrderTotal);
    }

    return(
        <Grid container justifyContent={'center'} alignItems={'center'} sx={{p: 4}}>
            <Grid item xs={12}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Button onClick={updateInventory}>Update inventory</Button>
                    <Button onClick={resetInventory}>Reset Inventory Back To 1000 units</Button>
                    <Button onClick={getTotalRevenue}>Get totals from orders</Button>
                    <Button onClick={showInventory}>Show the current inventory</Button>
                    <Button onClick={copyDatabase}>Copy database</Button>
                    <Button onClick={addOrderCountField}>Add new field to pizzas collection</Button>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Stack>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Sales:</Typography>
                    <Typography>${totalRevenue}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of Paid Orders:</Typography>
                    <Typography >{totalOrders}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of Pizza's Sold:</Typography>
                    <Typography>{totalPizzas}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of ATW Pizza's:</Typography>
                    <Typography>{totalATW}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of Da Bomb Pizza's:</Typography>
                    <Typography>{totalBomb}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of Maui Magic Pizza's:</Typography>
                    <Typography>{totalMaui}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of Xtreme Pizza's:</Typography>
                    <Typography>{totalXtreme}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of Pollinator Pizza's:</Typography>
                    <Typography>{totalPollinator}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of Big Country Pizza's:</Typography>
                    <Typography>{totalCountry}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of The Boz Pizza's:</Typography>
                    <Typography>{totalBoz}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of Pepperonipalooza Pizza's:</Typography>
                    <Typography>{totalPalooza}</Typography>
                    <Typography sx={{fontWeight: 'bold', mt: 1}}>Total Number of Hurricane Pizza's:</Typography>
                    <Typography>{totalHurricane}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                {inventoryArray.map(item => (
                    <Box sx={{my: 1}}>
                        <Typography sx={{fontWeight: 'bold'}} key={item.name}>Inventory Item:</Typography>
                        <Typography>Name: {item.name}</Typography>
                        <Typography>Total units: {item.units}</Typography>
                        <Typography>Cost per unit: ${item.cost}</Typography>
                    </Box>
                ))}
            </Grid>
        </Grid>
    )
}