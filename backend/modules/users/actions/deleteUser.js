import logger from '../../../utils/logger.js';
import userService from '../services/index.js';

export default async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).end();
  } catch (error) {
    logger.error('[Delete User Error]', error);
    res.status(500).json({ error: error.message });
  }
};
