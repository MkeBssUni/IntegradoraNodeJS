const { query }  = require('../../../utils/mysql');

const findAll = async()=>{
    const sql = `SELECT * FROM products`;
    return await query(sql,[])
}

const findById = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `SELECT * FROM products WHERE id_product = ?`;
    return await query(sql,[id])
}

const save = async(product) => {
    if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.stock ||
        !product.id_category
        ) throw Error('Missing fields');
    const sql = 'INSERT INTO products (title, description, price, stock, id_category) VALUES (?,?,?,?,?)';
    const { insertedId } =  await query(sql, [
        product.title,
        product.description,
        product.price,
        product.stock,
        product.id_category
    ]);
    return { ...product, id:insertedId }
}

const update = async(product, id) => {
    if (!id) throw Error('Missing field');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.stock ||
        !product.id_category
        ) throw Error('Missing fields');
    const sql = `UPDATE products SET title = ?, description = ?, price = ?, stock = ?, id_category = ? WHERE id_product = ?`;
    await query(sql, [
        product.title,
        product.description,
        product.price,
        product.stock,
        product.id_category,
        id
    ]);
    return { ...product, id:id }
}

const remove = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `DELETE FROM products WHERE id_product = ?`;
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