import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const extractVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await pool.query('SELECT * FROM watch_now_videos ORDER BY id DESC');
        res.status(200).json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'POST':
      try {
        const { title, video_url } = req.body;
        const video_id = extractVideoId(video_url);
        if (!video_id) {
          return res.status(400).json({ message: 'Invalid YouTube URL' });
        }
        const result = await pool.query(
          'INSERT INTO watch_now_videos (title, video_id) VALUES ($1, $2) RETURNING *',
          [title, video_id]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'PUT':
      try {
        const { id, title, video_url } = req.body;
        const video_id = extractVideoId(video_url);
        if (!video_id) {
          return res.status(400).json({ message: 'Invalid YouTube URL' });
        }
        const result = await pool.query(
          'UPDATE watch_now_videos SET title = $1, video_id = $2 WHERE id = $3 RETURNING *',
          [title, video_id, id]
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
        await pool.query('DELETE FROM watch_now_videos WHERE id = $1', [id]);
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
