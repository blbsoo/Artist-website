import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const writeFileAsync = promisify(fs.writeFile);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const result = await pool.query('SELECT email, country FROM subscribers ORDER BY id DESC');
    const subscribers = result.rows;

    const csvContent = 'email,country\n' + subscribers.map(s => `${s.email},${s.country}`).join('\n');
    const filePath = path.join(process.cwd(), 'public', 'subscribers.csv');

    await writeFileAsync(filePath, csvContent);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="subscribers.csv"`);
    res.send(csvContent);
  } catch (err) {
    console.error('Error exporting subscribers:', err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await pool.end();
  }
}
