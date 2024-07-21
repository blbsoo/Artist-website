const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function exportSubscribers() {
  try {
    const result = await pool.query('SELECT email, country FROM subscribers ORDER BY id DESC');
    const subscribers = result.rows;

    fs.writeFileSync('subscribers.csv', 'email,country\n' + subscribers.map(s => `${s.email},${s.country}`).join('\n'));
    console.log('Subscribers exported to subscribers.csv');
  } catch (err) {
    console.error('Error exporting subscribers:', err);
  } finally {
    await pool.end();
  }
}

exportSubscribers();
