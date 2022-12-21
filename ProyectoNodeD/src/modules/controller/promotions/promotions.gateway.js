const { query }  = require('../../../utils/mysql');

const findAll = async()=>{
    const sql = `SELECT * FROM promotions`;
    return await query(sql,[])
}

const findById = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `SELECT * FROM promotions WHERE id_promotion = ?`;
    return await query(sql,[id])
}

const save = async(promo) => {
    if (
        !promo.title ||
        !promo.description ||
        !promo.start_date ||
        !promo.end_date
        ) throw Error('Missing fields');
    const sql = `INSERT INTO promotions (title, description, start_date, end_date) VALUES (?,?,?,?)`;
    const { insertedId } =  await query(sql, [
        promo.title,
        promo.description,
        promo.start_date,
        promo.end_date
    ]);
    return { ...promo, id:insertedId }
}

const update = async(promo, id) => {
    if (!id) throw Error('Missing field');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    if (
        !promo.title ||
        !promo.description ||
        !promo.start_date ||
        !promo.end_date
        ) throw Error('Missing fields');
    const sql = 'UPDATE promotions SET title = ?, description = ?, start_date = ?, end_date = ? WHERE id_promotion = ?';
    await query(sql, [
        promo.title,
        promo.description,
        promo.start_date,
        promo.end_date,
        id
    ]);
    return { ...promo, id:id }
}

const remove = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `DELETE FROM promotions WHERE id_promotion = ?`;
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