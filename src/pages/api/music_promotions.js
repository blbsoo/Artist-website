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
        const result = await pool.query('SELECT * FROM music_promotions ORDER BY id DESC');
        res.status(200).json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'POST':
      try {
        const { title, description, listen_now_link, image_url, button_color } = req.body;
        const result = await pool.query(
          'INSERT INTO music_promotions (title, description, listen_now_link, image_url, button_color) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [title, description, listen_now_link, image_url, button_color]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'PUT':
      try {
        const { id, title, description, listen_now_link, image_url, button_color } = req.body;
        const result = await pool.query(
          'UPDATE music_promotions SET title = $1, description = $2, listen_now_link = $3, image_url = $4, button_color = $5 WHERE id = $6 RETURNING *',
          [title, description, listen_now_link, image_url, button_color, id]
        );
        res.status(200).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.query;
        await pool.query('DELETE FROM music_promotions WHERE id = $1', [id]);
        res.status(204).end();
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
