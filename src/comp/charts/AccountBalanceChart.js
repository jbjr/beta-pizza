import Box from "@mui/material/Box";

export default function AccountBalanceChart(){

    return(
        <Box sx={{width: 'fit', m: 3, backgroundColor: 'white', p: .5, boxShadow: 8, alignItems: 'center', justifyContent: 'space-evenly', display: 'flex', flexWrap: 'wrap'}}>
            <iframe
                title="Account Balance"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63e81148-6907-49c2-804d-39d699ae62f9&maxDataAge=3600&theme=light&autoRefresh=true"
                height="100"
                width="300"
            />
            <iframe
                title="Sales"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=63e8133a-1086-4fb1-8881-2973fc2176d5&maxDataAge=3600&theme=light&autoRefresh=true"
                height="100"
                width="300"
            />
            <iframe
                title="Expenses"
                src="https://charts.mongodb.com/charts-project-0-llsqu/embed/charts?id=5781fac2-710d-43b2-9647-f8592fda1184&maxDataAge=3600&theme=light&autoRefresh=true"
                height="100"
                width="300"
            />
        </Box>
    )
}