import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function ButtonChart(){

    return(
        <Box sx={{m: 3, backgroundColor: 'white', p: .5, boxShadow: 8, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', display: 'flex', flexWrap: 'wrap'}}>
            <Button sx={{my: 3}} variant={'contained'}>Update Database</Button>
            <Button sx={{my: 3}} variant={'contained'}>Order more inventory</Button>
            <Button sx={{my: 3}} variant={'contained'}>Do something else</Button>
        </Box>
    )
}