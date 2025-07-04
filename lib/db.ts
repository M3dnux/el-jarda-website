import postgres from 'postgres'

// Load .env.local only in development (not in production)
if (process.env.NODE_ENV !== 'production') {
  const { config } = require('dotenv')
  const path = require('path')
  config({ path: path.join(process.cwd(), '.env.local') })
}

const sql = postgres({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: 'require',
})

export default sql
