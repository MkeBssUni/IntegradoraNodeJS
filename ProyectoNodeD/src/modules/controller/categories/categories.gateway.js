const { query }  = require('../../../utils/mysql');

const findAll = async()=>{
    const sql = `SELECT * FROM categories`;
    return await query(sql,[])
}

const findById = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `SELECT * FROM categories WHERE id_category = ?`;
    return await query(sql,[id])
}

const save = async(category) => {
    if (
        !category.title
        ) throw Error('Missing fields');
    const sql = `INSERT INTO categories (title) VALUES (?)`;
    const { insertedId } =  await query(sql, [
        category.title
    ]);
    return { ...category, id:insertedId }
}

const update = async(category, id) => {
    if (!id) throw Error('Missing field');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    if (
        !category.title
        ) throw Error('Missing fields');
    const sql = `UPDATE categories SET title = ? WHERE id_category = ?`;
    await query(sql, [
        category.title,
        id
    ]);
    return { ...category, id:id }
}

const remove = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `DELETE FROM categories WHERE id_category = ?`;
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