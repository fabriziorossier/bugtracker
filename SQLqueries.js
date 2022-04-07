require('dotenv').config();
const { Pool } = require('pg');
const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectedUnauthorized: false
    }
};

const pool = new Pool();

// READ
const obtainBugs = async () => {
    try {
        const text = `SELECT * FROM bug ORDER BY ID_bug DESC`;
        const values = [];
        const result = await pool.query(text, values)
        .then(res => res.rows)
        .catch(err => console.error(`Error executing query`, err.stack))
        return result;
    }
    catch (e) {
        console.log(e);
    }
}
// READ - DEBUG
obtainBugs();

module.exports = { obtainBugs }