import logger from '../../../utils/logger';
import { deleteUser } from '../services';

export default async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).end();
  } catch (error) {
    logger.error('[Delete User Error]', error);
    res.status(500).json({ error: error.message });
  }
};
