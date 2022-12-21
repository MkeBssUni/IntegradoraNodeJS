const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const { findAll, findById, save, update, remove } = require("./providers.gateway");
const { auth, checkRoles } = require('../../../config/jwt')

const getAll = async (req, res = Response) => {
  try {
    const provider = await findAll();
    res.status(200).json(provider);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message }); // { message:""}
  }
};

const getById = async(req, res = Response) => {
  try {
    const { id } = req.params;
    const provider = await findById(id);
    res.status(200).json(provider);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const insert = async(req, res = Response ) => {
  try {
    const { fullname, address, phone_number, provides} = req.body;
    const provider = await save({
        fullname, address, phone_number, provides
    });    
    res.status(200).json(provider);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const actualize = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const { fullname, address, phone_number, provides } = req.body;
    const provider = await update(
      { fullname, address, phone_number, provides }, id
    );
    res.status(200).json(provider);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const eliminate = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const provider = await remove( id );
    res.status(200).json(provider);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const providersRouter = Router();

providersRouter.get('/', getAll);
providersRouter.get('/:id', getById);
providersRouter.post('/', /* checkRoles([2, 3]), */ insert);
providersRouter.put('/:id', /* checkRoles([2, 3]), */ actualize);
providersRouter.delete('/:id', /* checkRoles([3]), */ eliminate);


module.exports = {
  providersRouter
}
