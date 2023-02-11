import Box from "@mui/material/Box";

export default function TrendUserDOYChart(){

    return(
        <Box sx={{m: 3, backgroundColor: 'white', p: .5, boxShadow: 8, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <iframe
                title="MongoDB Atlas Chart"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63e43730-91d7-49f4-8366-4662155ad4cb&maxDataAge=3600&theme=light&autoRefresh=true"
                height="500"
                width="500"
            />
        </Box>
    )
}