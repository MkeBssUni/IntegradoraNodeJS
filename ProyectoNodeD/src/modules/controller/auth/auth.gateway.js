/* const { query } = require('../../../utils/mysql')
const { generateToken } = require('../../../config/jwt')
const { validatePassword } = require('../../../utils/functions')

const Login = async ( user ) => {
    const { email, password } = user;
    if (!email || !password) throw Error("Missing fields")
    const sql = `SELECT * FROM users WHERE email = ? AND status = 1`;
    const existUser = await query(sql, [email]);
    // validar password
    if(await validatePassword(password, existUser[0].password)) return generateToken({
        id:existUser[0].id,
        email:email,
        role:existUser[0].role,
        isLogged:true
    });
    throw Error('Password mismatch')
};

module.exports = {
    Login
} */

/* ----------------------------------------------------------------------- */

//dato == gateway

/* const {query} = require('../../../utils/MySQLConnection')
const { generateToken } = require('../../../config/jwt')
const { validatePassword } = require('../../../utils/functions')



const Login = async(user) =>{   
    const {email, password} = user; //destructuracion 
    if (!email || !password) throw Error("Missing fields")
    const sql = `SELECT * FROM users WHERE email=? AND status=1`
    const existUser = await query(sql, [email]);
    //Validar el password{
    if(await validatePassword(password, existUser[0].password))
    return generateToken({
        id:existUser[0].id,
        email:email,
        rol:existUser[0].role,
        isLogged:true
    })      
    throw Error('Password mismatch')
}


module.exports = {
    Login
} */

/* ----------------------------------------------------------------------- */

const { query } = require('../../../utils/mysql')
const { generateToken } = require('../../../config/jwt')
const { validatePassword } = require('../../../utils/functions')

const Login = async ( user ) => {
    const { email, password } = user;
    if (!email || !password) throw Error("Missing fields")
    const sql = `SELECT * FROM users WHERE email = ? AND status = 1`;
    const existUser = await query(sql, [email]);
    // validar password
    if(await validatePassword(password, existUser[0].password)) return generateToken({
        id:existUser[0].id,
        email:email,
        role:existUser[0].role,
        isLogged:true
    });
    throw Error('Password mismatch')
};

module.exports = {
    Login
}