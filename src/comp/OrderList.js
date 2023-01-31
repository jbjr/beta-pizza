import {List, ListItem, ListItemText, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


export default function OrderList({items, detailsId, detailsTotal}){
    return(
        <Box sx={{border: 'solid', p: 2}}>
            <Box sx={{display: 'flex', flexDirect: 'row'}}>
                <Typography sx={{fontWeight: 'bold', mr: 2}}>User Id for Order:</Typography>
                <Typography>{detailsId}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirect: 'row'}}>
                <Typography sx={{fontWeight: 'bold', mr: 2}}>Order Total:</Typography>
                <Typography>{detailsTotal}</Typography>
            </Box>
            <Typography></Typography>
            {items.map(item => (
                <List key={item.name}>
                    <Typography sx={{fontSize: 'small'}}>Description</Typography>
                    <ListItem>
                        {item.name} {item.price}
                    </ListItem>
                </List>
                ))}
            <Box sx={{display: 'flex', flexDirection: 'row', }}>
                <Button variant={"contained"}>Checkout</Button>
            </Box>
        </Box>
    )
}