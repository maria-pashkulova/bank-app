import * as request from '../lib/request';

const baseUrl = 'http://localhost:5000/users';

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
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

// Returns a promise with the login response (type can be refined)
export const login = (userData: LoginInput): Promise<any> =>
  request.post(`${baseUrl}/login`, userData);

// Returns a promise with the register response (type can be refined)
export const register = (userData: RegisterInput): Promise<any> =>
  request.post(
    `${baseUrl}/register`,userData
 );

// Returns a promise with the logout response 
// export const logout = (): Promise<any> => request.get(`${baseUrl}/logout`);