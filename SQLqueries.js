require('dotenv').config();
const { Pool } = require('pg');
const config = {
    connectionString: process.env.SQL_URL,
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

// CREATE
const createUser = async (userName, userEmail, userPassword, userRol) => {
    try {
        let rol;
        if (userRol == 'administrador'){
            rol = 1;
        }
        else if (userRol == 'developer'){
            rol = 2;
        }
        const text = `INSERT INTO usuario(nombre, email, password, rol, estado) VALUES ($1, $2, $3, $4, $5)`;
        const values = [userName, userEmail, userPassword, rol, true];
        const result = await pool.query(text, values)
        .then(res => res.rows)
        .catch(err => console.error(`Error executing query`, err.stack))
        console.log(result);
        return result;
    }
    catch (e){
        console.log(e);
    }
};
// CREATE - DEBUG
//createUser('Miguel Angel', 'miguel@desafiolatam.com', '123', 'administrador');

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
const obtainBugsByUser = async (userName) => {
    try {
        const text = `SELECT * FROM bug WHERE usuario = $1 ORDER BY ID_bug DESC`;
        const values = [userName];
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
        const text = `SELECT nombre FROM usuario WHERE rol = $1 AND estado = $2 ORDER BY nombre ASC`;
        const values = [2, true];
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
const obtainRols = async () => {
    try {
        const text = `SELECT descripcion FROM rol ORDER BY ID_rol DESC`;
        const values = [];
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
//obtainRols();

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

// UPDATE
const changeBugState = async (id, state) => {
    try {
        const text = `UPDATE bug SET estado = $1 WHERE ID_bug = $2`;
        const values = [state, id];
        const result = await pool.query(text, values)
        .then(res => res.rows)
        .catch(err => console.error(`Error executing query`, err.stack))
        return result;
    }
    catch (e){
        console.log(e);
    }
};
// UPDATE - DEBUG
//changeBugState(13, 'Finalizado');

// DELETE
const deleteUser = async (nombre) => {
    try {
        const text = `UPDATE usuario SET estado = $1 WHERE nombre = $2`;
        const values = [false, nombre];
        const result = await pool.query(text, values)
        .then(res => res.rows)
        .catch(err => console.error(`Error executing query`, err.stack))
        return result;
    }
    catch (e){
        console.log(e);
    }
};
// DELETE - DEBUG
//deleteUser('biscuit');

module.exports = { createBug, createUser, obtainBugsGeneral, obtainBugsByUser, obtainUserNames, obtainRols, validateUser, changeBugState, deleteUser }