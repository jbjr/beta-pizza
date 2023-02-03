import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import {getOrdersCollection} from "./helper";
import * as Realm from "realm-web";
import {Alert, Collapse} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import {useState} from "react";

export default function OrderTable({items}) {
    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    const [open, setOpen] = useState(false);


    async function deleteCartItem(event){
        const cartItem = event.target.value;
        console.log(cartItem);
        const orderCollection = getOrdersCollection(user);
        const query = {
            "user_id": user.id,
            "status": "pending",

        };
        const result = await orderCollection.findOne(query);

        const update ={
            "$unset": {[`item.${cartItem}`]: 1}
        }
        const rowUpdate = {
            "$pull": {"item": null}
        }

        const orderResult = await orderCollection.updateOne(query, update);
        const rowResult = await orderCollection.updateOne(query, rowUpdate);
        const displayResult = await orderCollection.findOne(query);

        console.log(cartItem);
        console.log(result);
        console.log(orderResult);
        console.log(rowResult);
        console.log(displayResult);

        setOpen(true);


    }

    return (
        <TableContainer component={Paper}>
            <Collapse in={open}>
                <Alert sx={{}} variant={"filled"} severity="warning">
                    Item removed - click refresh below to see updated cart!
                </Alert>
            </Collapse>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{color: 'white', fontWeight: 'bold', backgroundColor: 'black'}}>Item Name</TableCell>
                        <TableCell align="right" sx={{color: 'white', fontWeight: 'bold', backgroundColor: 'black'}}>Price</TableCell>
                        <TableCell align="right" sx={{color: 'white', fontWeight: 'bold', backgroundColor: 'black'}}>Quantity</TableCell>
                        <TableCell align={"right"} sx={{backgroundColor: 'black'}}>
                            <Button href={'/cart-page/' + user.id} sx={{color: 'white'}}><RefreshIcon/></Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">{item.price}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">
                                <Button onClick={deleteCartItem} value={item.rowId} variant={'contained'} color={'error'} sx={{fontSize: 10}}>Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}