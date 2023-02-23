import {AppBar, Box, Button, Dialog, Grid, Paper, Stack, Toolbar, Tooltip, Typography} from "@mui/material";
import PollIcon from '@mui/icons-material/Poll';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useEffect, useState} from "react";
import * as Realm from "realm-web";
import {getFinanceCollection, getOrdersCollection, pizzaCountSwitch} from "../comp/helper";
import TextField from "@mui/material/TextField";
import UpdateIcon from '@mui/icons-material/Update';
import Timer10Icon from '@mui/icons-material/Timer10';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import SpeedSlowIcon from "../comp/icons/SpeedSlowIcon";
import SpeedFastIcon from "../comp/icons/SpeedFastIcon";

export default function AdminPageTwo(){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

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
            updateBalances();
            setOpen(false);

            //return user;
        } catch (err) {
            alert("That is not a valid key")
            console.error("Failed to log in", err);
            console.log("Could not sign in, try again.")
        }
        //await updateBalances();
    }



    useEffect(() => {
        const interval = setInterval(() => {
            updateBalances();
        }, 60000);

        return () => clearInterval(interval);

    }, []);

    const [accountBalance, setAccountBalance] = useState('');
    const [salesBalance, setSalesBalance] = useState('');
    const [expenseBalance, setExpenseBalance] = useState('');
    const [totalOrders, setTotalOrders] = useState()
    const [totalItemsOrdered, setTotalItemsOrdered] = useState();
    const [totalAverage, setTotalAverage] = useState();
    const [itemAverage, setItemAverage] = useState();
    const [time, setTime] = useState('1800');


    async function updateBalances(){
        const financeCollection = getFinanceCollection(user);
        const ordersCollection = getOrdersCollection(user);
        const resultAccount = await financeCollection.findOne({"type": "Account"})
        const resultSales = await financeCollection.findOne({"type": "Revenue"})
        const resultExpenses = await financeCollection.findOne({"type": "Expenses"})
        const ordersCount = await ordersCollection.count({"status": "paid"});
        const resultOrders = await ordersCollection.find({"status": "paid"});

        let lineItemCount = 0;
        resultOrders.forEach(pizzas => {
            pizzas.item.forEach(pizza => {
                lineItemCount = lineItemCount + pizza.qty;
            })
        })

        let tempSales = parseFloat(resultSales.value);
        let tempOrders = parseFloat(ordersCount);
        let tempPizzas = parseFloat(lineItemCount);
        let tempAverageSales = tempSales / tempOrders;
        let tempItemAverage = tempPizzas / tempOrders;


        setAccountBalance(resultAccount.value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
        setSalesBalance(resultSales.value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
        setExpenseBalance(resultExpenses.value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
        setTotalOrders(ordersCount);
        setTotalItemsOrdered(lineItemCount);
        setTotalAverage(tempAverageSales.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
        setItemAverage(tempItemAverage.toFixed(2));
    }

    function updateEveryTen(){
        setTime("30");
    }

    function updateEveryThirtyMin(){
        setTime("1800");
    }

    //const time = "3600";
    const inventory = `https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63f3bf7b-26ab-41e1-8a2e-981f339bbce5&maxDataAge=${time}&theme=dark&autoRefresh=true&attribution=false`
    const pizzaRunningTotal = `https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63f3cbbe-d44f-43de-8cb5-6f713aea50c5&maxDataAge=${time}&theme=dark&autoRefresh=true&attribution=false`
    const totalRunningTotal = `https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63f3cca4-ad08-4cd4-89c5-243a65ef9b6d&maxDataAge=${time}&theme=dark&autoRefresh=true&attribution=false`
    const totalPerPizza = `https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63f3b7f0-26ab-4d47-8b32-981f3392dae3&maxDataAge=${time}&theme=dark&autoRefresh=true&attribution=false`
    const ordersPerDayofWeek = `https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63f3bb8f-045a-493e-8628-514e7d55255a&maxDataAge=${time}&theme=dark&autoRefresh=true&attribution=false`
    const totalPerDayofWeek = `https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63f3bcd7-742a-48a4-82a2-a318dfc90134&maxDataAge=${time}&theme=dark&autoRefresh=true&attribution=false`
    const pizzaPerDayofWeek = `https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63f3ba91-ace8-4052-83d2-2aca35a56c86&maxDataAge=${time}&theme=dark&autoRefresh=true&attribution=false`

    return(
        <Grid container justifyContent={'center'} alignItems={'flex-start'} sx={{minHeight: '100vh', backgroundColor: '#424242', p: .5}}>
            <Dialog fullScreen open={open} onClose={handleClose} sx={{}}>
                <Box sx={{backgroundColor: '#757575', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontWeight: 'bold', color: '#21313C'}} variant={'h5'}>Admin Verification</Typography>
                    <TextField onChange={handleChange} sx={{width: '300', m: 3, backgroundColor: 'white'}} value={adminKey} label="Admin Key" variant="outlined"></TextField>
                    <Button sx={{mx: 3, boxShadow: '10', backgroundColor: '#21313C', '&:hover': {backgroundColor: '#21313C'}}} variant={"contained"} onClick={handleClose}>Continue</Button>
                </Box>
            </Dialog>
            <Grid item xs={12}>
                <Grid container justifyContent={'center'} alignItems={'flex-start'} sx={{backgroundColor: '#bdbdbd', boxShadow: 10}}>
                    <Grid item xs={12}>
                        <Box sx={{mb: 2, flexGrow: 1 }}>
                            <AppBar position="static" sx={{ backgroundColor: '#21313C'}}>
                                <Toolbar>
                                    <Typography variant="h6" component="div" sx={{fontWeight: 'bold', color: 'white', flexGrow: 1}}>
                                        ADMIN DASHBOARD
                                    </Typography>
                                    <Tooltip title={'Update charts every 30 minutes'}><Button onClick={updateEveryThirtyMin} sx={{color: 'white'}}><SpeedSlowIcon/></Button></Tooltip>
                                    <Tooltip title={'Update charts every 10 seconds'}><Button onClick={updateEveryTen} sx={{color: 'white'}}><SpeedFastIcon/></Button></Tooltip>
                                    <Tooltip title={'Update balances. (Current automatic refresh is 60 seconds).'}><Button onClick={updateBalances} sx={{color: 'white'}}><UpdateIcon/></Button></Tooltip>
                                    <Button href={'/'} sx={{color: 'white'}}><ExitToAppIcon/></Button>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{p: 1, backgroundColor: '', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <Paper sx={{m: 2, boxShadow: '10px 10px 10px', p: 1, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#21313C'}}>
                                <Typography sx={{width: 150, fontWeight: 'bold', color: 'white'}}>Account Balance</Typography>
                                <Typography sx={{fontWeight: 'bold', color: 'white'}}>{accountBalance}</Typography>
                            </Paper>
                            <Paper sx={{m: 2, boxShadow: '10px 10px 10px', p: 1, height: 50, backgroundColor: '#21313C'}}>
                                <Typography sx={{width: 150, fontWeight: 'bold', color: 'white'}}>Monthly Sales</Typography>
                                <Typography sx={{fontWeight: 'bold', color: 'white'}}>{salesBalance}</Typography>
                            </Paper>
                            <Paper sx={{m: 2, boxShadow: '10px 10px 10px', p: 1, height: 50, backgroundColor: '#21313C'}}>
                                <Typography sx={{width: 150, fontWeight: 'bold', color: 'white'}}>Monthly Expenses</Typography>
                                <Typography sx={{fontWeight: 'bold', color: 'white'}}>{expenseBalance}</Typography>
                            </Paper>
                            <Paper sx={{m: 2, boxShadow: '10px 10px 10px', p: 1, height: 50, backgroundColor: '#21313C'}}>
                                <Typography sx={{width: 150, fontWeight: 'bold', color: 'white'}}>Total Orders</Typography>
                                <Typography sx={{fontWeight: 'bold', color: 'white'}}>{totalOrders}</Typography>
                            </Paper>
                            <Paper sx={{m: 2, boxShadow: '10px 10px 10px', p: 1, height: 50, backgroundColor: '#21313C'}}>
                                <Typography sx={{width: 150, fontWeight: 'bold', color: 'white'}}>Total Pizzas</Typography>
                                <Typography sx={{fontWeight: 'bold', color: 'white'}}>{totalItemsOrdered}</Typography>
                            </Paper>
                            <Paper sx={{m: 2, boxShadow: '10px 10px 10px', p: 1, height: 50, backgroundColor: '#21313C'}}>
                                <Typography sx={{width: 150, fontWeight: 'bold', color: 'white'}}>Total / Order</Typography>
                                <Typography sx={{fontWeight: 'bold', color: 'white'}}>{totalAverage}</Typography>
                            </Paper>
                            <Paper sx={{m: 2, boxShadow: '10px 10px 10px', p: 1, height: 50, backgroundColor: '#21313C'}}>
                                <Typography sx={{width: 150, fontWeight: 'bold', color: 'white'}}>Pizzas / Order</Typography>
                                <Typography sx={{fontWeight: 'bold', color: 'white'}}>{itemAverage}</Typography>
                            </Paper>

                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{p: 1, backgroundColor: '', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                            <iframe style={{marginBottom: '2em', boxShadow: '10px 10px 10px', border: 'none', background: '#21313C', height: 400, width: 310}} src={inventory}/>
                            <iframe style={{marginBottom: '2em', boxShadow: '10px 10px 10px', border: 'none', background: '#21313C', height: 400, width: 400}} src={totalPerPizza}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{p: 1, backgroundColor: '', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                            <iframe style={{marginBottom: '2em', boxShadow: '10px 10px 10px', border: 'none', background: '#21313C', height: 400, width: 650}} src={totalRunningTotal}/>
                            <iframe style={{marginBottom: '2em', boxShadow: '10px 10px 10px', border: 'none', background: '#21313C', height: 400, width: 650}} src={pizzaRunningTotal}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{p: 2, backgroundColor: '', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                            <iframe style={{boxShadow: '10px 10px 10px', border: 'none', marginBottom: '2em', background: '#21313C', height: 500, width: 1000}} src={pizzaPerDayofWeek}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{pb: 2}}>
                        <Box sx={{p: 2, backgroundColor: '', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                            <iframe style={{boxShadow: '10px 10px 10px', border: 'none', background: '#21313C', height: 400, width: 400}} src={ordersPerDayofWeek}/>
                            <iframe style={{boxShadow: '10px 10px 10px', border: 'none', background: '#21313C', height: 400, width: 700}} src={totalPerDayofWeek}/>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}