import Box from "@mui/material/Box";

export default function OrdersPerUserChart(){

    return(
        <Box sx={{m: 3, backgroundColor: 'white', p: .5, boxShadow: 8, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <iframe
                title="MongoDB Atlas Chart"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63d5d7bd-de36-4c3b-8abf-e18917c4a2a6&maxDataAge=3600&theme=light&autoRefresh=true"
                height="600"
                width="700"
            />
        </Box>
    )
}