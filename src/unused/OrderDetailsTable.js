import {List, ListItem} from "@mui/material";

export default function OrderDetailsTable({items}) {
    return (
        <List>
            {items.map(pizza => (
                <ListItem key={pizza.name}>
                    {pizza.name} {pizza.price}
                </ListItem>
            ))}
        </List>
    );
}