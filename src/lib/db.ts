import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'nabizkibris',
  password: process.env.DB_PASSWORD || 'NabizKibris2024!',
  database: process.env.DB_NAME || 'nabizkibris',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

// Get client IP from request headers
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}
