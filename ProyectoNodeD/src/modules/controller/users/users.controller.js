const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const { findAll, findById, save, update, remove } = require("./users.gateway");
const { auth, checkRoles } = require('../../../config/jwt')

const getAll = async (req, res = Response) => {
  try {
    const user = await findAll();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message }); 
  }
};

const getById = async(req, res = Response) => {
  try {
    const { id } = req.params;
    const user = await findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const insert = async(req, res = Response ) => {
  try {
    const { username,password,id_role,email, phone_number } = req.body;
    const user = await save({
      username,password,id_role,email, phone_number
    });    
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const actualize = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const { username,password,id_role,status,email, phone_number } = req.body;
    console.log( username,password,id_role,status,email, phone_number )
    const user = await update(
      { username,password,id_role,status,email, phone_number }, id
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const eliminate = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const user = await remove( id );
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const usersRouter = Router();

usersRouter.get('/', /* checkRoles([3]), */ getAll);
usersRouter.get('/:id', /* checkRoles([3]), */ getById);
usersRouter.post('/', /* checkRoles([3]), */ insert);
usersRouter.put('/:id', /* checkRoles([3]), */ actualize);
usersRouter.delete('/:id', /* checkRoles([3]), */ eliminate);


module.exports = {
    usersRouter
}
