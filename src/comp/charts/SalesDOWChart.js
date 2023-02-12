import Box from "@mui/material/Box";

export default function SalesDOWChart(){

    return(
        <Box sx={{m: 3, p: .5, backgroundColor: 'white', boxShadow: 8, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <iframe
                title="MongoDB Atlas Chart"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63e430a0-b64e-405c-8d23-293d8688a56d&maxDataAge=3600&theme=light&autoRefresh=true"
                height="500"
                width="500"
            />
        </Box>
    )
}