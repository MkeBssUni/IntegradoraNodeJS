/* const { Response, Router } = require('express')
const { validateError } = require('../../../utils/functions')
const { Login } = require('./auth.gateway')

const signin = async(req, res = Response) => {
    try {
        const { email, password } = req.body;
        const token = await Login({ email, password })
        res.status(200).json({ token })
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message })
    }
}

const authRouter = Router();
authRouter.post('/', signin);

module.exports = {
    authRouter
} */

/* --------------------RULAS------------------------------------- */
/* 
const { Response, Router } = require('express')
const { validateError } = require('../../../utils/functions')
const { login } = require('./auth.gateway')

const signIn = async(req, res = Response) =>{
    try {
        const { email, password } = req.body
        console.log(email, password)
        const token = await login({email, password})
        res.status(200).json({ token })
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({message});
    }
}

const authRouter = Router();
authRouter.post('/', signIn)

module.exports = {
    authRouter
} */

/* -------------------yo-------------------------------------- */

const { Response, Router } = require('express')
const { validateError } = require('../../../utils/functions')
const { Login } = require('./auth.gateway')

const signin = async(req, res = Response) => {
    try {
        const { email, password } = req.body;
        const token = await Login({ email, password })
        res.status(200).json({ token })
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message })
    }
}

const authRouter = Router();
authRouter.post('/', signin);

module.exports = {
    authRouter
}