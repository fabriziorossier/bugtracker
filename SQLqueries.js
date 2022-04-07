require('dotenv').config();
const { create } = require('express-handlebars');
const { Pool } = require('pg');
const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectedUnauthorized: false
    }
};

const pool = new Pool();

// CREATE
const createBug = async (bugName, bugDescription, bugUser) => {
    try {
        const text = `INSERT INTO bug(nombre, descripcion, usuario, estado) VALUES ($1, $2, $3, $4)`;
        const values = [bugName, bugDescription, bugUser, 'Pendiente'];
        const result = await pool.query(text, values)
        .then(res => res.rows)
        .catch(err => console.error(`Error executing query`, err.stack))
        return result;
    }
    catch (e) {
        console.log(e);
    }
};
// CREATE - DEBUG
//createBug('Bug de Prueba', 'Descripcion de Prueba', 'Fabrizio Rossier');

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
};
// READ - DEBUG
//obtainBugsByUser(2);

// READ
const obtainUserNames = async () => {
    try {
        const text = `SELECT nombre FROM usuario ORDER BY ID_usuario ASC`
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
//obtainUserNames();

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

module.exports = { createBug, obtainBugsGeneral, obtainBugsByUser, obtainUserNames, validateUser }