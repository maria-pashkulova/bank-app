import express, {Express} from "express";
import "dotenv/config";
import connectToDb from './config/dbConfig';
import expressConfig from "./config/expressConfigurator";
import routes from './routes'
const port = process.env.PORT || 5000

//Init
const app:Express = express();

expressConfig(app);

//Connecting to the database
connectToDb()
    .then(() => console.log('Successfully connected to database'))
    .catch((error) => console.log(`Error while connecting to the DB: ${error}`));


//Routing
app.use(routes)


app.listen(port, () => 
    console.log(`Server is running on port ${port}`)
);
