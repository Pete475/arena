import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();
//use PROD_DB for main database
const PG_URI = process.env.PROD_DB;

console.log('PG_URI', PG_URI);

const pool = new Pool({
  connectionString: PG_URI,
});

pool
  .query('SELECT NOW()')
  .then((res) => console.log('DB connected:', res.rows[0].now))
  .catch((err) => console.error('DB connection error:', err));

export default pool;
