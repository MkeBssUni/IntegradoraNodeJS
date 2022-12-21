const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const { findAll, findById, save, update, remove } = require("./clients.gateway");
const { auth, checkRoles } = require('../../../config/jwt')

const getAll = async (req, res = Response) => {
  try {
    const client = await findAll();
    res.status(200).json(client);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message }); // { message:""}
  }
};

const getById = async(req, res = Response) => {
  try {
    const { id } = req.params;
    const client = await findById(id);
    res.status(200).json(client);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const insert = async(req, res = Response ) => {
  try {
    const { fullname, email } = req.body;
    const client = await save({
        fullname, email
    });    
    res.status(200).json(client);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const actualize = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const { fullname, email, visits } = req.body;
    const client = await update(
      { fullname, email, visits }, id
    );
    res.status(200).json(client);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const eliminate = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const client = await remove( id );
    res.status(200).json(client);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const clientsRouter = Router();

clientsRouter.get('/', getAll);
clientsRouter.get('/:id', getById);
clientsRouter.post('/', insert);
clientsRouter.put('/:id', actualize);
clientsRouter.delete('/:id', /* checkRoles([2, 3]) */ eliminate);


module.exports = {
  clientsRouter
}
