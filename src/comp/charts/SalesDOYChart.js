import Box from "@mui/material/Box";

export default function SalesDOYChart(){

    return(
        <Box sx={{m: 3, backgroundColor: 'white', p: .5, boxShadow: 8, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <iframe
                title="MongoDB Atlas Chart"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63e431fa-67a6-4bce-8813-0caf7540a7b0&maxDataAge=3600&theme=light&autoRefresh=true"
                height="500"
                width="500"
            />
        </Box>
    )
}