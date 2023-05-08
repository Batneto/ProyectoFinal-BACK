const { Pool } = require('pg')

const pool = new Pool({
    host: 'horton.db.elephantsql.com',
    user: 'czrvvabe',
    database: 'czrvvabe',
    password: 'XslBXVzJUbl5-H6JTNyy_0DJwKtRvX6B'
})


const getAllEntriesModel = async () => {

    let client, result

    try {
        client = await pool.connect()

        const data = await client.query(`
                SELECT *
                FROM entradas` )

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
 * @param {String} email 
 * @returns 
 */
const getEntriesByEmail = async (email) => {

    let client, result

    try {
        client = await pool.connect()
        const data = await client.query(`
                SELECT e.titulo,e.contenido,e.fecha,e.id_categorias,e.id_usuarios,e.precio
                FROM entradas AS e
                INNER JOIN usuarios AS u
                ON e.id_usuarios=u.id_usuarios
                WHERE u.email=$1
                ORDER BY e.titulo;`, [email])                                     
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
 * @param {String} categoria 
 * @returns 
 */
const getEntriesByCategory = async (categoria) => {

    let client, result

    try {
        client = await pool.connect()

        const data = await client.query(`
                SELECT e.titulo,e.contenido,e.fecha,e.id_categorias,e.id_usuarios,e.precio
                FROM entradas AS e
                INNER JOIN categorias AS c
                ON e.id_categorias=c.id_categorias
                WHERE c.nombre=$1
                ORDER BY e.titulo;`, [categoria])           

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
 * @param {String} search 
 * @returns 
 */
const entriesBySearchModel = async (search) => {

    let client, result

    try {
        client = await pool.connect()

        const data = await client.query(`
            SELECT titulo, contenido, fecha, precio
            FROM entradas
            WHERE titulo LIKE '%' || $1 ||  '%'
            ORDER BY fecha;`, [search])           

        result = data.rows

    } catch (error) {
        console.log(error);
        throw error
    } finally {
        client.release()
    }

    return result

}


const getEntriesByIdModel = async (id) => {

    let client, result

    try {
        client = await pool.connect()

        const data = await client.query(`
                SELECT e.id_entradas, e.titulo,e.contenido,e.fecha,e.id_categorias,e.id_usuarios,e.precio
                FROM entradas AS e
                INNER JOIN usuarios AS u
                ON e.id_usuarios=u.id_usuarios
                WHERE u.id_usuarios=$1
                ORDER BY e.titulo;`, [id])         

        result = data.rows

    } catch (error) {
        console.log(error);
        throw error
    } finally {
        client.release()
    }

    return result

}


const getEntriesByEntrieIdModel = async (id) => {

    let client, result

    try {
        client = await pool.connect()

        const data = await client.query(`
                SELECT e.id_entradas, e.titulo,e.contenido,e.imagen_producto,e.id_categorias,e.id_usuarios,e.precio
                FROM entradas AS e
                INNER JOIN usuarios AS u
                ON e.id_usuarios=u.id_usuarios
                WHERE e.id_entradas=$1
                ORDER BY e.titulo;`, [id])         

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
 * @param {String} titulo 
 * @param {String} contenido 
 * @param {String} imagen 
 * @param {Number} precio 
 * @param {String} usuario 
 * @param {String} categoria 
 * @returns 
 */
const postNewEntriesModel = async (titulo,contenido,imagen,precio,usuario,categoria) => {

    let client, result

    try {
        
        client = await pool.connect()

        const data = await client.query(`
        INSERT INTO entradas(titulo,contenido,imagen_producto,precio,id_usuarios,id_categorias) 
        VALUES ($1,$2,$3,$4,$5,$6);`,[titulo,contenido,imagen,precio,usuario,categoria])

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
 * @param {Number} id 
 * @param {String} titulo 
 * @param {String} contenido 
 * @param {String} imagen_producto 
 * @param {Number} precio 
 * @returns 
 */
const updateEntriesModel = async (id,titulo,contenido,imagen_producto,precio) => {

    let client, result

    try {
        
        client = await pool.connect()
        
        const data = await client.query(`
        UPDATE entradas
        SET titulo=$2,contenido=$3,imagen_producto=$4,precio=$5
        WHERE id_entradas=$1`,[id,titulo,contenido,imagen_producto,precio])

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
 * @param {Number} id 
 * @returns 
 */
const deleteEntriesModel = async (id) => {


    let client, result;

    try {

        client = await pool.connect();
        result = await client.query(`
        DELETE FROM entradas
        WHERE id_entradas = $1`, [id]);

    } catch (error) {

        console.log('Error al eliminar la entrada:', error);
        throw error;

    } finally {

        client.release();

    }

    return result;
}



module.exports = {

    getAllEntriesModel,
    getEntriesByEmail,
    getEntriesByCategory,
    getEntriesByIdModel,
    postNewEntriesModel,
    getEntriesByEntrieIdModel,
    updateEntriesModel,
    deleteEntriesModel,
    entriesBySearchModel,
}