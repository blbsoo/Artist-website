import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import aws from 'aws-sdk';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-2', // Use the correct region
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM store_items ORDER BY created_at DESC');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Failed to fetch store items:', error);
      res.status(500).json({ error: 'Failed to fetch store items' });
    }
  } else if (req.method === 'POST') {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ error: 'Missing name or image' });
    }

    const imageKey = `${uuidv4()}.jpg`;
    const params = {
      Bucket: 'store-content', // Use your bucket name
      Key: imageKey,
      Body: Buffer.from(image, 'base64'),
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    };

    try {
      const data = await s3.upload(params).promise();
      const imageUrl = data.Location;

      const result = await pool.query(
        'INSERT INTO store_items (name, image_url) VALUES ($1, $2) RETURNING *',
        [name, imageUrl]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Failed to upload image or insert store item:', error);
      res.status(500).json({ error: 'Failed to upload image or insert store item', details: error.message });
    }
  } else if (req.method === 'DELETE') {
    const { id, imageKey } = req.body;

    if (!id || !imageKey) {
      return res.status(400).json({ error: 'Missing id or imageKey' });
    }

    const params = {
      Bucket: 'store-content', // Use your bucket name
      Key: imageKey,
    };

    try {
      await s3.deleteObject(params).promise();
      await pool.query('DELETE FROM store_items WHERE id = $1', [id]);

      res.status(200).json({ message: 'Store item deleted successfully' });
    } catch (error) {
      console.error('Failed to delete store item:', error);
      res.status(500).json({ error: 'Failed to delete store item', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
