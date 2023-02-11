import Box from "@mui/material/Box";

export default function PriceOfPizzaChart(){

    return(
        <Box sx={{m: 3, backgroundColor: 'white', p: .5, boxShadow: 8, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <iframe
                title="MongoDB Atlas Chart"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63d5d489-7a1a-474b-8519-34b2a9fe29ad&maxDataAge=3600&theme=light&autoRefresh=true"
                height="500"
                width="500"
            />
        </Box>
    )
}