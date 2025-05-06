import express, {Express, Request, Response} from "express";
import "dotenv/config";
import expressConfig from "./config/expressConfigurator";


//Init
const app:Express = express();

expressConfig(app);

app.get("/", (req:Request, res:Response) => {
    res.send("Hello");
});

app.listen(process.env.PORT || 5000, () => 
    console.log(`Server is running on port ${process.env.PORT || '5000' }`)
);
