import { sign } from '../lib/jwt';
import { Types } from 'mongoose';

async function generateAccessToken(_id: Types.ObjectId): Promise<string> {
    const accessToken = await sign(
        { _id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: 3600 } // 3600 seconds = 1 hour
    );

    return accessToken
}
export default generateAccessToken