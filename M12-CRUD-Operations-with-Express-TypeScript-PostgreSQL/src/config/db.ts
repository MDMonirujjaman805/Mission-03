// import { Pool } from "pg";
// import config from ".";

// // DataBase
// export const pool = new Pool({
//   connectionString: config.connection_str,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

import { Pool } from "pg";
import config from ".";

if (!config.connection_str) {
  console.error("❌ CONNECTION_STRING missing from .env");
  process.exit(1);
}

export const pool = new Pool({
  connectionString: config.connection_str,
  ssl: {
    rejectUnauthorized: false,
  },
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 5000,
});

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT,
        email VARCHAR(150) UNIQUE NOT NULL,
        role VARCHAR(100) NOT NULL, 
        password TEXT NOT NULL,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
  await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
};
