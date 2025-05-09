import { Router } from 'express';
import auth from "./middlewares/authenticationMiddleware";

import userController from './controllers/userController';
import responseErrorMiddleware  from './middlewares/responseErrorMiddleware';

const router = Router();
//partial route middleware
router.use('/users', userController);
router.use('/dashboard', auth, (req, res) => {
    res.json({ message: 'Prottected endpoint' });
});

router.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found!' });
});

router.use(responseErrorMiddleware);


export default router;