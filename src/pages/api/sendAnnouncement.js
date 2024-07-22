import { Pool } from 'pg';
import sendEmail from '../../utils/email'; 

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { subject, message } = req.body;
    const result = await pool.query('SELECT email FROM subscribers');
    const emails = result.rows.map(row => row.email);

    // Send email to all subscribers
    for (const email of emails) {
      await sendEmail(email, subject, message);
    }

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
