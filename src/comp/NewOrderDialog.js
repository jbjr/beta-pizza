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

    async function handleStartNewOrder(){
        setOpen(false);
        const user = app.currentUser;
        const orderCollection = getOrdersCollection(user);

        const deleteResult = await orderCollection.deleteMany({
            "user_id": user.id,
            "status": "pending"
        });

        console.log(deleteResult);

        const newOrder = {
            "user_id": user.id,
            "item": [],
            "total": 0,
            "status": "pending",
            "status_date": new Date()
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
                    Are you ready to start a new order?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleStartNewOrder} autoFocus={true}>Start New Order</Button>
            </DialogActions>
        </Dialog>
    )
}