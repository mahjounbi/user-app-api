import pkg from 'pg';
import chalk from 'chalk';

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.on('error', (err) => {
  console.log(chalk.hex('#34ace0').bold(err));
});

export const query = pool.query.bind(pool); // 👈 export nommé
export default pool;
