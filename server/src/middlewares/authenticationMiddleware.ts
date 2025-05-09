import { Request, Response, NextFunction } from 'express';
import {verify} from '../lib/jwt';
import { getById } from '../services/userService';


//Needed to add user details to the request object
//TODO: add more user details if needed
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
        name: string;
    };
}

interface DecodedToken {
    _id: string
  }

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
   const authHeader = req.headers.authorization;
   if(!authHeader) {
     res.status(401).json({ message: 'Изисква се вписване в системата' });
     return;
   }
   const token = authHeader.split(' ')[1]; // Token structure is 'Bearer <token>'

    try {
        // Validate token
        const decodedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET!) as DecodedToken

        // Fetch user details from the database
        const user = await getById(decodedToken._id);
        if (!user) {
            res.status(401).json({ message: 'User not found!' });
            return;
        }

        // Attach user details to the request object
        //TODO: add more user details if needed
        req.user = {
            _id: decodedToken._id,
            name: user.cyrillicName,
        };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Невалиден токен' });
    }
};

export default auth;