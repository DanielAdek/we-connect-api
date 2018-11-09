import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const baseUrl = '/api/v1';
const token = {
  user: `${jwt.sign({
    id: 1,
    email: 'mail1@gmail.com'
  }, process.env.SECRET, { expiresIn: '24h' })}`,
  userTwo: `${jwt.sign({
    id: 2,
    email: 'mail2@gmail.com',
  }, process.env.SECRET, { expiresIn: '24h' })}`
};

export default { baseUrl, token };
