const { query }  = require('../../../utils/mysql');

const findAll = async()=>{
    const sql = `SELECT * FROM get_orders`;
    return await query(sql,[])
}

const findById = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `SELECT * FROM get_orders WHERE id = ?`;
    return await query(sql,[id])
}

const save = async(order) => {
    if (
        !order.description ||
        !order.date_order ||
        !order.total ||
        !order.id_client ||
        !order.id_user
        ) throw Error('Missing fields');
    const sql = `INSERT INTO orders (description, date_order, total, id_client, id_user) VALUES (?,?,?,?,?)`;
    const { insertedId } =  await query(sql, [
        order.description,
        order.date_order,
        order.total,
        order.id_client,
        order.id_user
    ]);
    return { ...order, id:insertedId }
}

const update = async(order, id) => {
    if (!id) throw Error('Missing field');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    if (
        !order.description ||
        !order.date_order ||
        !order.total ||
        !order.id_client ||
        !order.id_user
        ) throw Error('Missing fields');
    const sql = `UPDATE orders SET description = ?, date_order = ?, total = ?, id_client = ?, id_user = ? WHERE id_order = ?`;
    await query(sql, [
        order.description,
        order.date_order,
        order.total,
        order.id_client,
        order.id_user,
        id
    ]);
    return { ...order, id:id }
}

const remove = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `DELETE FROM orders WHERE id_order = ?`;
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