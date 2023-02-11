import Box from "@mui/material/Box";

export default function MyChart(){

    return(
            <Box sx={{m: 3, backgroundColor: 'white', p: .5, boxShadow: 8, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <iframe
                    title="MongoDB Atlas Chart"
                    src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63d6bb3a-7df1-4d8d-89e9-8dfaded2262a&maxDataAge=3600&theme=light"
                    height="300"
                    width="300"
                />
            </Box>
    )
}