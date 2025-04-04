const { default: logger } = require('../../../utils/logger');

const { updateUser } = require('../services').default;

module.exports = async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    logger.error('[Update User Error]', error);
    res.status(400).json({ error: error.message });
  }
};
