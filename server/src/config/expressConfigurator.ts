import express, {Express, Request, Response, NextFunction, ErrorRequestHandler} from "express";


function expressConfig(app:Express) {

    //CORS related
    app.use((req:Request, res:Response, next:NextFunction) => {
        res.header('Access-Control-Allow-Origin', req.header('origin'));
        res.header('Access-Control-Allow-Methods',
            'GET, OPTIONS, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers','Origin, Content-Type, Authorization');

        res.header('Access-Control-Allow-Credentials', 'true');

        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.sendStatus(200); // Preflight requests should return 200 status
        } else {
            next();
        }
    })

    //Parse query strings -> req.query
    app.use(express.urlencoded({ extended: false }));
    
    //Parse json data in the req.body
    app.use(express.json({ limit: '10mb' }));

    //logger middleware
    app.use((req, res, next) => {
        console.log(req.method, req.path);
        next();
    });

    //Error handling middleware for PayloadTooLargeError that can be thrown by 
    //express.urlEncoded() and express.json() middlewares
    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        if (err.status === 413) {
            res.status(413).json({ message: 'Payload too large' })
        } else {
            next(err)
        }
    };
    app.use(errorHandler);
}
export default expressConfig;