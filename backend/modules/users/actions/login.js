import db from '../../../sql/db';
import { verifyPassword } from '../../../utils/bcrypt';
import logger from '../../../utils/logger';

export default async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    delete user.password;
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    logger.error('[Login Error]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
