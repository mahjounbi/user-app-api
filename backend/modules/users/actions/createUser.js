import logger from '../../../utils/logger.js';
import userService from '../services/index.js';

export default async (req, res) => {
  try {
    console.log('req.body', req.body)
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('[Create User Error]', error);
    res.status(400).json({ error: error.message });
  }
};
