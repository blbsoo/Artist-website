import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await pool.query('SELECT * FROM subscribers ORDER BY id DESC');
        res.status(200).json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'POST':
      try {
        const { email, country } = req.body;
        const result = await pool.query(
          'INSERT INTO subscribers (email, country) VALUES ($1, $2) RETURNING *',
          [email, country]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.query;
        await pool.query('DELETE FROM subscribers WHERE id = $1', [id]);
        res.status(204).end();
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
