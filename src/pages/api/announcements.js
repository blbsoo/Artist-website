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
        const result = await pool.query('SELECT id, text, image_url, video_url, audio_url, posted_date::timestamptz AT TIME ZONE \'UTC\' AS posted_date FROM announcements ORDER BY posted_date DESC');
        res.status(200).json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'POST':
      try {
        const { text, image_url, video_url, audio_url } = req.body;
        const result = await pool.query(
          'INSERT INTO announcements (text, image_url, video_url, audio_url) VALUES ($1, $2, $3, $4) RETURNING *',
          [text, image_url, video_url, audio_url]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'PUT':
      try {
        const { id, text, image_url, video_url, audio_url } = req.body;
        const result = await pool.query(
          'UPDATE announcements SET text = $1, image_url = $2, video_url = $3, audio_url = $4 WHERE id = $5 RETURNING *',
          [text, image_url, video_url, audio_url, id]
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
        await pool.query('DELETE FROM announcements WHERE id = $1', [id]);
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
