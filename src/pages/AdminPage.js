import {Accordion, AccordionDetails, AccordionSummary, Dialog, Stack, Typography} from "@mui/material";
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AppBar from "@mui/material/AppBar";
import InventoryChart from "../comp/charts/InventoryChart";
import {getFinanceCollection, getOrdersCollection, getPizzaCollection, pizzaCountSwitch} from "../comp/helper";
import Paper from "@mui/material/Paper";

export default function AdminPage(){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    const [open, setOpen] = useState(true);

    const [adminKey, setAdminKey] = useState('');

    const [accountBalance, setAccountBalance] = useState(0);
    const [salesBalance, setSalesBalance] = useState(0);
    const [expenseBalance, setExpenseBalance] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0)
    const [totalItemsOrdered, setTotalItemsOrdered] = useState(0);
    const [mostOrdered, setMostOrdered] = useState('');
    const [mostOrderedTotal, setMostOrderedTotal] = useState(0);

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

    async function updateBalances(){
        const financeCollection = getFinanceCollection(user);
        const resultAccount = await financeCollection.findOne({"type": "Account"})
        const resultSales = await financeCollection.findOne({"type": "Revenue"})
        const resultExpenses = await financeCollection.findOne({"type": "Expenses"})



        setAccountBalance(resultAccount.value.toFixed(2));
        setSalesBalance(resultSales.value.toFixed(2));
        setExpenseBalance(resultExpenses.value.toFixed(2));

        const ordersCollection = getOrdersCollection(user);
        const queryOrders = {"status": "paid"};
        const ordersCount = await ordersCollection.count(queryOrders);
        setTotalOrders(ordersCount);

        let lineItemCount = 0;
        let mostPopular = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        const resultOrders = await ordersCollection.find(queryOrders);
        const pizzaCollection = await getPizzaCollection(user);

        resultOrders.forEach(pizzas => {
            pizzas.item.forEach(pizza => {
                lineItemCount = lineItemCount + pizza.qty;
                if (pizza.item_id === "1"){
                    //atwCount = atwCount + pizza.qty;
                    mostPopular[0] = mostPopular[0] + pizza.qty;
                }
                else if (pizza.item_id === "2"){
                    //bombCount = bombCount + pizza.qty;
                    mostPopular[1] = mostPopular[1] + pizza.qty;
                }
                else if (pizza.item_id === "3"){
                    //mauiCount = mauiCount + pizza.qty;
                    mostPopular[2] = mostPopular[2] + pizza.qty;
                }
                else if (pizza.item_id === "4"){
                    //xtremeCount = xtremeCount + pizza.qty;
                    mostPopular[3] = mostPopular[3] + pizza.qty;
                }
                else if (pizza.item_id === "5"){
                    //pollinatorCount = pollinatorCount + pizza.qty;
                    mostPopular[4] = mostPopular[4] + pizza.qty;
                }
                else if (pizza.item_id === "6"){
                    //countryCount = countryCount + pizza.qty;
                    mostPopular[5] = mostPopular[5] + pizza.qty;
                }
                else if (pizza.item_id === "7"){
                    //bozCount = bozCount + pizza.qty;
                    mostPopular[6] = mostPopular[6] + pizza.qty;
                }
                else if (pizza.item_id === "8"){
                    //paloozaCount = paloozaCount + pizza.qty;
                    mostPopular[7] = mostPopular[7] + pizza.qty;
                }
                else if (pizza.item_id === "9"){
                    //hurricaneCount = hurricaneCount + pizza.qty;
                    mostPopular[8] = mostPopular[8] + pizza.qty;
                }
            })
        })
        setTotalItemsOrdered(lineItemCount);
        console.log(Math.max(...mostPopular));

        let testIndex = mostPopular.indexOf(Math.max(...mostPopular));
        console.log(testIndex);

        let tempMostOrderedTotal = Math.max(...mostPopular);

        let tempMostOrdered = pizzaCountSwitch(testIndex);
        console.log('Most ordered Pizza:   ', tempMostOrdered);

        setMostOrdered(tempMostOrdered);
        setMostOrderedTotal(tempMostOrderedTotal);


        let tester = [{
            ATW: 41,
            Boz: 10
        }]
        //console.log(Math.max(...tester));

    }

    return(
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                sx={{}}
            >
                <Box sx={{backgroundColor: '#e8eaf6', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontWeight: 'bold', color: '#1a237e'}} variant={'h5'}>Admin Verification</Typography>
                    <TextField onChange={handleChange} sx={{width: '300', m: 3, backgroundColor: 'white'}} value={adminKey} label="Admin Key" variant="outlined"></TextField>
                    <Button sx={{mx: 3, boxShadow: '10', backgroundColor: '#3f51b5', '&:hover': {backgroundColor: '#9fa8da'}}} variant={"contained"} onClick={handleClose}>Continue</Button>
                </Box>
            </Dialog>
        <Grid container sx={{backgroundColor: '#e8eaf6', minHeight: '100vh', justifyContent: 'center', alignItems: 'flex-start', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <Grid item xs={12} sx={{}}>
                <AppBar position="static" sx={{backgroundColor: '#1a237e'}} elevation={10}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{fontWeight: 'bold', flexGrow: 1 }}>
                            ADMIN DASHBOARD
                        </Typography>
                        <Button href={'/'}><ExitToAppIcon sx={{color: 'white'}}/></Button>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} sx={{flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Stack direction={'row'} sx={{justifyContent: 'center', alignItems: 'center'}}>
                    <Paper sx={{minWidth: 1/3, m: 1, px:5, py: 3, justifyContent: 'center', alignItems: 'center'}} elevation={5}>
                        <Typography sx={{fontWeight: 'bold'}}>Account Balance</Typography>
                        <Typography>${accountBalance}</Typography>
                    </Paper>
                    <Paper sx={{minWidth: 1/3, px: 5, py: 3, justifyContent: 'center', alignItems: 'center'}} elevation={5}>
                        <Typography sx={{fontWeight: 'bold'}}>Monthly Sales</Typography>
                        <Typography>${salesBalance}</Typography>
                    </Paper>
                    <Paper sx={{minWidth: 1/3, m: 1, px: 5, py: 3, justifyContent: 'center', alignItems: 'center'}} elevation={5}>
                        <Typography sx={{fontWeight: 'bold'}}>Monthly Expenses</Typography>
                        <Typography>${expenseBalance}</Typography>
                    </Paper>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent: 'center', alignItems: 'center'}}>
                    <Paper sx={{minWidth: 1/3, m: 1, px: 5, py: 3, justifyContent: 'center', alignItems: 'center'}} elevation={5}>
                        <Typography sx={{fontWeight: 'bold'}}>Total Orders</Typography>
                        <Typography>{totalOrders}</Typography>
                    </Paper>
                    <Paper sx={{minWidth: 1/3, px: 5, py: 3, justifyContent: 'center', alignItems: 'center'}} elevation={5}>
                        <Typography sx={{fontWeight: 'bold'}}>Total Pizzas Ordered</Typography>
                        <Typography>{totalItemsOrdered}</Typography>
                    </Paper>
                    <Paper sx={{minWidth: 1/3, m: 1, px: 5, py: 3, justifyContent: 'center', alignItems: 'center'}} elevation={5}>
                        <Typography sx={{fontWeight: 'bold'}}>Highest Selling Pizza</Typography>
                        <Typography>{mostOrdered} with {mostOrderedTotal}</Typography>
                    </Paper>
                </Stack>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} sx={{flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button sx={{mx: 3, boxShadow: '10', backgroundColor: '#3f51b5', '&:hover': {backgroundColor: '#9fa8da'}}}  variant={'contained'}>Update Database</Button>
                <Button sx={{mx: 3, boxShadow: '10', backgroundColor: '#3f51b5', '&:hover': {backgroundColor: '#9fa8da'}}}  variant={'contained'}>Order more inventory</Button>
                <Button onClick={updateBalances} sx={{mx: 3, boxShadow: '10', backgroundColor: '#3f51b5', '&:hover': {backgroundColor: '#9fa8da'}}} variant={'contained'}>Update Balances</Button>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2} sx={{}}></Grid>
            <Grid item xs={8} sx={{my: 2}}>
                <Accordion sx={{mb: 2, borderRadius: '5px'}} elevation={5}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'h6'} sx={{fontWeight: 'bold'}}>Inventory</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{backgroundColor: 'white'}}>
                        <InventoryChart/>
                    </AccordionDetails>
                </Accordion>
                    <Accordion sx={{mb: 2, borderRadius: '5px'}} elevation={5}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold'}}>Sales</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{backgroundColor: 'white'}}>
                            <SalesDOWChart/>
                            <SalesDOYChart/>
                            <TrendUserDOYChart/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{mb: 2, borderRadius: '5px'}} elevation={5}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold'}}>Order Trends</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <OrdersPerUserChart/>
                            <PizzaOrderFrequencyChart/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{borderRadius: '5px'}} elevation={5}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold'}}>Misc</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PriceOfPizzaChart/>
                            <MyChart/>
                            <MyChart/>
                        </AccordionDetails>
                    </Accordion>

            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
            </>
    )
};