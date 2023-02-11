import Box from "@mui/material/Box";

export default function PizzaOrderFrequencyChart(){

    return(
        <Box sx={{m: 3, backgroundColor: 'white', p: .5, boxShadow: 8, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <iframe
                title="MongoDB Atlas Chart"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63d5d8c2-de36-4e85-88fd-e18917c51526&maxDataAge=3600&theme=light&autoRefresh=true"
                height="600"
                width="800"
            />
        </Box>
    )
}