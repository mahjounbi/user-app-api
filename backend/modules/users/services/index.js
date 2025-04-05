import { query as _query } from '../../../sql/db.js';
import { hashPassword } from '../../../utils/bcrypt.js';

const toCamelCase = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    city: row.city,
    country: row.country,
    phoneNumber: row.phone_number,
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const getAllUsers = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const usersQuery = 'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2';
  const countQuery = 'SELECT COUNT(*) FROM users';

  const [usersResult, countResult] = await Promise.all([
    _query(usersQuery, [limit, offset]),
    _query(countQuery),
  ]);

  const users = usersResult.rows.map(toCamelCase);

  return {
    users,
    total: parseInt(countResult.rows[0].count, 10),
    page,
    limit,
  };
};

const getUserById = async (id) => {
  const { rows } = await _query('SELECT * FROM users WHERE id = $1', [id]);
  return toCamelCase(rows[0]);
};

const createUser = async (data) => {
  const {
    email,
    password,
    firstName,
    lastName,
    city,
    country,
    phoneNumber,
    position,
  } = data;

  const hashedPassword = await hashPassword(password);

  const query = `
    INSERT INTO users (email, password, first_name, last_name, city, country, phone_number, position)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const values = [
    email,
    hashedPassword,
    firstName,
    lastName,
    city,
    country,
    phoneNumber,
    position,
  ];

  const { rows } = await _query(query, values);
  return toCamelCase(rows[0]);
};

const updateUser = async (id, data) => {
  const {
    firstName,
    lastName,
    city,
    country,
    phoneNumber,
    position,
  } = data;

  const query = `
    UPDATE users
    SET first_name = $1,
        last_name = $2,
        city = $3,
        country = $4,
        phone_number = $5,
        position = $6,
        updated_at = NOW()
    WHERE id = $7
    RETURNING *
  `;

  const values = [
    firstName,
    lastName,
    city,
    country,
    phoneNumber,
    position,
    id,
  ];

  const { rows } = await _query(query, values);
  return toCamelCase(rows[0]);
};

const deleteUser = async (id) => {
  await _query('DELETE FROM users WHERE id = $1', [id]);
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
