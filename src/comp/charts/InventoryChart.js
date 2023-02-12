import Box from "@mui/material/Box";

export default function InventoryChart(){

    return(
        <Box sx={{m: 3, backgroundColor: 'white', p: .5, boxShadow: 8, alignItems: 'center', justifyContent: 'space-evenly', display: 'flex', flexWrap: 'wrap'}}>
            <iframe
                title="Cheese"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=9acc7c9f-c2f6-4596-961b-d744832a8ab6&maxDataAge=3600&theme=light&autoRefresh=true"
                height="300"
                width="300"
            />
            <iframe
                title="Meat"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=28ebb91f-8606-4ed5-8e2c-e3a2eaa92b22&maxDataAge=3600&theme=light&autoRefresh=true"
                height="300"
                width="300"
            />
            <iframe
                title="Produce"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=74b25ab5-92fe-4eed-a9aa-ff19de41ff2e&maxDataAge=3600&theme=light&autoRefresh=true"
                height="300"
                width="300"
            />
            <iframe
                title="Pizza Boxes"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=513ee4a1-77ae-4d88-b2b6-fd7534f2e745&maxDataAge=3600&theme=light&autoRefresh=true"
                height="300"
                width="300"
            />
            <iframe
                title="Sauce"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63e7fbdc-1dbb-45c0-8dc2-9cdd99c6ee70&maxDataAge=3600&theme=light&autoRefresh=true"
                height="300"
                width="300"
            />
            <iframe
                title="Dough"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=5e996aa1-f3ab-447a-a81a-4a25a42b8292&maxDataAge=3600&theme=light&autoRefresh=true"
                height="300"
                width="300"
            />
        </Box>
    )
}