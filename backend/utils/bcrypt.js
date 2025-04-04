import { hash, compare } from 'bcrypt';

const saltRounds = 10;

export const hashPassword = (password) => hash(password, saltRounds);

export const verifyPassword = (password, hashedPassword) => compare(password, hashedPassword);
