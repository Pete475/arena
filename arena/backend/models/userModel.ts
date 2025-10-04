import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();
//use PROD_DB for main database
const PG_URI = process.env.PROD_DB;

console.log('PG_URI', PG_URI);

const pool = new Pool({
  connectionString: PG_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
