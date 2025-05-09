import bcrypt from 'bcrypt';
import User from '../models/User';
import generateAccessToken from '../utils/authenticationUtils';
import mongoose, { Types } from 'mongoose';
import {createError} from '../utils/customErrorUtils';


interface RegisterInput {
    pid: string;
    idNum?: string; // Optional field
    cyrillicName: string;
    latinName: string;
    email: string;
    phone: string;
    address: string;
    username: string;
    password: string;
}

interface LoginInput {
    username: string;
    password: string;
}

export const register = async ({ password, ...rest }: RegisterInput) => {
    const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ ...rest, password: hashedPassword });
        const accessToken = await generateAccessToken(user._id as Types.ObjectId);
    
        return {
            _id: user._id as string,
            name: user.cyrillicName,
            accessToken
        };
};

export const login = async ({ username, password }: LoginInput) => {
    const user = await User.findOne({ username }).select('_id cyrillicName password');

    if (!user) {
        throw createError('Грешен имейл или парола!', 401);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw createError('Грешен имейл или парола!', 401);
    }

    const accessToken = await generateAccessToken(user._id as Types.ObjectId);

    return {
        _id: user._id,
        name: user.cyrillicName,
        accessToken
    };
};

export const getById = async (userId: string)=> {
    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Не съществува такъв потребител!');
    }

    //Check if user still exists in DB after login
  // Use lean() for better performance - no need for mongoose document methods
    const user = await User.findById(userId)
        .select('cyrillicName') 
        .lean(); 

    if (!user) {
        throw new Error('Не съществува такъв потребител!');
    }

    return user;
};
