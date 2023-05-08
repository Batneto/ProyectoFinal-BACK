const { Pool } = require('pg')

const pool = new Pool({
    host: 'horton.db.elephantsql.com',
    user: 'czrvvabe',
    database: 'czrvvabe',
    password: 'XslBXVzJUbl5-H6JTNyy_0DJwKtRvX6B'
})

/**
 * 
 * @param {String} email 
 * @returns 
 */
const getUserByEmailModel = async (email) => {

    let client, result

    try {
        client = await pool.connect()

        const data = await client.query(`
        SELECT a.nombre,a.apodo,a.imagen_perfil, a.id_rol
        FROM usuarios AS a
        WHERE a.email=$1`, [email])

        result = data.rows

    } catch (error) {
        console.log(error);
        throw error
    } finally {
        client.release()
    }

    return result

}

const getUserByIDModel = async (id) => {

    let client, result

    try {
        client = await pool.connect()

        const data = await client.query(`
        SELECT a.nombre,a.apodo,a.imagen_perfil, a.email,a.pass
        FROM usuarios AS a
        WHERE a.id_usuarios=$1`, [id])

        result = data.rows

    } catch (error) {
        console.log(error);
        throw error
    } finally {
        client.release()
    }

    return result

}


const getAllUsers = async () => {

    let client, result

    try {
        client = await pool.connect()

        const data = await client.query(`
                SELECT *
                FROM usuarios
                ORDER BY id_usuarios `)

        result = data.rows

    } catch (error) {
        console.log(error);

        throw error

    } finally {
        client.release()
    }

    return result

}


/**
 * 
 * @param {String} nombre 
 * @param {String} image_perfil 
 * @param {String} email 
 * @param {String} pass 
 * @param {String} apodo 
 * @returns {Object}
 */
const postNewUserModel = async (nombre,imagen_perfil,email,pass,apodo) => {

    let client, result

    try {
        
        

        client = await pool.connect()

        const data = await client.query(`
        INSERT INTO usuarios(id_rol,nombre,imagen_perfil,email,pass,apodo) 
        VALUES (2,$1,$2,$3,$4,$5);`,[nombre,imagen_perfil,email,pass,apodo])

        result = data

    } catch (error) {
        console.log(error);

        throw error

    } finally {
        client.release()
    }
    console.log(result);

    return result

}

/**
 * 
 * @param {String} nombre 
 * @param {String} image_perfil 
 * @param {String} email 
 * @param {String} pass 
 * @param {String} apodo 
 * @returns {Object}
 */
const postNewAdminModel = async (nombre,imagen_perfil,email,pass,apodo) => {

    let client, result

    try {
        
        

        client = await pool.connect()

        const data = await client.query(`
        INSERT INTO usuarios(id_rol,nombre,imagen_perfil,email,pass,apodo) 
        VALUES (1,$1,$2,$3,$4,$5);`,[nombre,imagen_perfil,email,pass,apodo])

        result = data

    } catch (error) {
        console.log(error);

        throw error

    } finally {
        client.release()
    }
    console.log(result);

    return result

}


const loginModel = async (email)=>{

    let client, result

    try {
        client = await pool.connect()

        const data = await client.query(`
        SELECT 
        * FROM 
        usuarios 
        WHERE email=$1`, [email])

        result = data.rows

    } catch (error) {
        console.log(error);
        throw error
    } finally {
        client.release()
    }

    return result



}



/**
 * 
 * @param {Number} id 
 * @returns {Object}
 */
const deleteUserModel = async (id) => {

    let client, result

    try {
        
        client = await pool.connect()
        
        const data = await client.query(`

        DELETE FROM usuarios
        WHERE id_usuarios = $1;`,[id])

        result = data

    } catch (error) {
        console.log(error);

        throw error

    } finally {
        client.release()
    }
    console.log(result);

    return result

}


/**
 * 
 * @param {Number} id_usuarios 
 * @param {String} nombre 
 * @param {String} image_perfil 
 * @param {String} email 
 * @param {String} pass 
 * @param {String} apodo 
 * @returns {Object}
 */
const updateUserModel = async (id_usuarios,nombre,image_perfil,email,pass,apodo) => {

    let client, result

    try {
        
        client = await pool.connect()
        
        const data = await client.query(`
        UPDATE usuarios
        SET id_rol=2, nombre=$2,imagen_perfil=$3,email=$4,pass=$5, apodo=$6
        WHERE id_usuarios=$1`,[id_usuarios,nombre,image_perfil,email,pass,apodo])

        result = data

    } catch (error) {
        console.log(error);

        throw error

    } finally {
        client.release()
    }
    console.log(result);

    return result

}


module.exports = {
    getUserByEmailModel,
    getUserByIDModel,
    getAllUsers,
    postNewUserModel,
    postNewAdminModel,
    deleteUserModel,
    updateUserModel,
    loginModel
}