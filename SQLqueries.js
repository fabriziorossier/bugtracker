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
const obtainBugsGeneral = async () => {
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
};
// READ - DEBUG
//obtainBugsGeneral();

// READ
const obtainBugsByUser = async (id) => {
    try {
        const text = `SELECT * FROM bug WHERE usuario = $1 ORDER BY ID_bug DESC`;
        const values = [id];
        const result = await pool.query(text, values)
        .then(res => res.rows)
        .catch(err => console.error(`Error executing query`, err.stack))
        return result;
    }
    catch (e){
        console.log(e);
    }
}
// READ - DEBUG
//obtainBugsByUser(2);

// READ
const validateUser = async (email, password) => {
    try {
        const text = `SELECT * FROM usuario WHERE email = $1 AND password = $2`;
        const values = [email, password];
        const result = await pool.query(text, values)
        .then(res => res.rows)
        .catch(err => console.error(`Error executing query`, err.stack))
        return result;
    }
    catch (e) {
        console.log(e);
    }
};
// READ - DEBUG
//validateUser('fabrizio@desafiolatam.com', '123456');

module.exports = { obtainBugsGeneral, obtainBugsByUser, validateUser }