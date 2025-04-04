import logger from '../../../utils/logger';
import { getAllUsers } from '../services';

export default async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getAllUsers(parseInt(page, 10), parseInt(limit, 10));
    res.json(result);
  } catch (error) {
    logger.error('[Get All Users Error]', error);
    res.status(500).json({ error: error.message });
  }
};
