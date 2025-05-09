import {Router} from 'express';
import {register,login} from '../services/userService';
const router = Router();

router.post('/login', async (req, res) => {
    const userData = await login(req.body);
    res.json(userData);
});


router.post('/register', async (req, res) => {
    const userData = await register(req.body);
    res.json(userData);
});


export default router;