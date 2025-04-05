import logger from '../../../utils/logger.js';
import userService from '../services/index.js';

export default async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await userService.getAllUsers(parseInt(page, 10), parseInt(limit, 10));
    res.json(result);
  } catch (error) {
    logger.error('[Get All Users Error]', error);
    res.status(500).json({ error: error.message });
  }
};
