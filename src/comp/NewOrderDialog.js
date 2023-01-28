import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import * as Realm from "realm-web";
import {getOrdersCollection} from "./helper";


export default function NewOrderDialog(){

    const app = Realm.App.getApp('application-0-ctrvo');

    const[open, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    async function handleYesClose(){
        setOpen(false);
        const user = app.currentUser;
        const orderCollection = getOrdersCollection(user);
        const newOrder = {
            "user_id": user.id,
            "item": [],
            "total": "",
            "status": "pending"
        }
        const result = await orderCollection.insertOne(newOrder);
        console.log(result);
    }

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Welcome to Beta Pizza!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you ready to take a look at our menu and start a new order?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleYesClose} autoFocus>
                    Start My Order
                </Button>
            </DialogActions>
        </Dialog>
    )
}