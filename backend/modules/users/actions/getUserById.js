import logger from '../../../utils/logger.js';
import userService from '../services/index.js';

export default async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    logger.error('[Get User ById Error]', error);
    return res.status(500).json({ error: error.message });
  }
};
