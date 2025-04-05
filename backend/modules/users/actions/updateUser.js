import { default as logger } from '../../../utils/logger.js';
import userService from '../services/index.js';

export default async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    logger.error('[Update User Error]', error);
    res.status(400).json({ error: error.message });
  }
};
