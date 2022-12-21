const { query }  = require('../../../utils/mysql');
const { hashPassword } = require('../../../utils/functions')

const findAll = async()=>{
    const sql = `SELECT * FROM users`;
    return await query(sql,[])
}

const findById = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `SELECT * FROM users WHERE id_user = ?`;
    return await query(sql,[id])
}

const save = async(user) => {
    if (
        !user.username ||
        !user.password ||
        !user.id_role ||
        !user.email ||
        !user.phone_number) throw Error('Missing fields');
    const sql = `INSERT INTO users (username, password, id_role, status, email, phone_number) VALUES (?,?,?,1,?,?)`;
    const hashedPassword = await hashPassword(user.password)
    const { insertedId } =  await query(sql, [
        user.username,
        hashedPassword,
        user.id_role,
        user.email,
        user.phone_number
    ]);
    return { ...user, id:insertedId }
}

const update = async(user, id) => {
    console.log(user)
    if (!id) throw Error('Missing field');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    if (
        !user.username ||
        !user.password ||
        !user.id_role ||
        !user.status ||
        !user.email ||
        !user.phone_number
        ) throw Error('Missing fields');
    const sql = `UPDATE users SET username = ?, password = ?, id_role = ?, status = ?, email = ?, phone_number = ? WHERE id_user = ?`;
    const hashedPassword = await hashPassword(user.password)
    console.log(user)
    await query(sql, [
        user.username,
        hashedPassword,
        user.id_role,
        user.status,
        user.email,
        user.phone_number,
        id
    ]);
    return { ...user, id:id }
}

const remove = async(id) => {
    if (!id) throw Error('Missing fields');
    if (Number.isNaN(id)) throw Error('Wrong Type');
    const sql = `DELETE FROM users WHERE id_user = ?`;
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