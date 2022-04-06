require('dotenv').config();
const { Pool } = require('pg');
const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectedUnauthorized: false
    }
};

const pool = new Pool(config);

