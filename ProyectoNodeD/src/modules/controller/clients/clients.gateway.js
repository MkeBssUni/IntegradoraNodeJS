const { query }  = require('../../../utils/mysql');

const findAll = async()=>{
    const sql = `SELECT * FROM clients`;
    return await query(sql,[])
}

const findById = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `SELECT * FROM clients WHERE id_client = ?`;
    return await query(sql,[id])
}

const save = async(client) => {
    if (
        !client.fullname ||
        !client.email 
        ) throw Error('Missing fields');
    const sql = 'INSERT INTO clients (fullname, email, visits) VALUES (?,?, 1)';
    const { insertedId } =  await query(sql, [
        client.fullname,
        client.email
    ]);
    return { ...client, id:insertedId }
}

const update = async(client, id) => {
    console.log(client)
    console.log(id)
    if (!id) throw Error('Missing field');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    if (
        !client.fullname ||
        !client.email ||
        !client.visits
        ) throw Error('Missing fields');
    const sql = `UPDATE clients SET fullname = ?, email = ?, visits = ? WHERE id_client = ?`;
    await query(sql, [
        client.fullname,
        client.email,
        client.visits,
        id
    ]);
    return { ...client, id:id }
}

const remove = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `DELETE FROM clients WHERE id_client = ?`;
    await query(sql, [ id ]);
    return { idDeleted:id } 
}

module.exports = {
    findAll,
    findById,
    save, 
    update,
    remove
}