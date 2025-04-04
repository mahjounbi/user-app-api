import logger from '../../../utils/logger';
import { createUser } from '../services';

export default async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('[Create User Error]', error);
    res.status(400).json({ error: error.message });
  }
};
