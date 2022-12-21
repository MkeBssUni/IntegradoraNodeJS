const { query }  = require('../../../utils/mysql');

const findAll = async()=>{
    const sql = `SELECT * FROM providers`;
    return await query(sql,[])
}

const findById = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `SELECT * FROM providers WHERE id_provider = ?`;
    return await query(sql,[id])
}

const save = async(provider) => {
    if (
        !provider.fullname ||
        !provider.address ||
        !provider.phone_number ||
        !provider.provides
        ) throw Error('Missing fields');
    const sql = `INSERT INTO providers (fullname, address, phone_number, provides) VALUES (?,?,?,?)`;
    const { insertedId } =  await query(sql, [
        provider.fullname,
        provider.address,
        provider.phone_number,
        provider.provides
    ]);
    return { ...provider, id:insertedId }
}

const update = async(provider, id) => {
    if (!id) throw Error('Missing field');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    if (
        !provider.fullname ||
        !provider.address ||
        !provider.phone_number ||
        !provider.provides
        ) throw Error('Missing fields');
    const sql = `UPDATE providers SET fullname = ?, address = ?, phone_number = ?, provides = ? WHERE id_provider = ?`;
    await query(sql, [
        provider.fullname,
        provider.address,
        provider.phone_number,
        provider.provides,
        id
    ]);
    return { ...provider, id:id }
}

const remove = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `DELETE FROM providers WHERE id_provider = ?`;
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