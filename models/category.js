const { Pool } = require('pg')

const pool = new Pool({
    host: 'horton.db.elephantsql.com',
    user: 'czrvvabe',
    database: 'czrvvabe',
    password: 'XslBXVzJUbl5-H6JTNyy_0DJwKtRvX6B'
})


const getAllCategory = async () => {

    let client, result

    try {
        client = await pool.connect()

        const data = await client.query(`
                SELECT *
                FROM categorias
                ORDER BY id_categorias `)

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
 * @returns 
 */
const postNewCategoryModel = async (nombre) => {

    let client, result

    try {
        
        client = await pool.connect()

        const data = await client.query(`
        INSERT INTO categorias(nombre) 
        VALUES ($1);`,[nombre])

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
const deleteCategoryModel = async (id) => {


    let client, result;

    try {

        client = await pool.connect();
        result = await client.query(`
        DELETE FROM categorias
        WHERE id_categorias = $1`, [id]);

    } catch (error) {

        console.log('Error al eliminar la entrada:', error);
        throw error;

    } finally {

        client.release();

    }

    return result;
}


module.exports = {

    getAllCategory,
    postNewCategoryModel,
    deleteCategoryModel
}