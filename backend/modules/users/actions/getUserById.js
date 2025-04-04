import logger from '../../../utils/logger';
import { getUserById } from '../services';

export default async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    logger.error('[Get User ById Error]', error);
    return res.status(500).json({ error: error.message });
  }
};
