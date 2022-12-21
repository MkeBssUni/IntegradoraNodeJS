const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const { findAll, findById, save, update, remove } = require("./products.gateway");
const { auth, checkRoles } = require('../../../config/jwt')

const getAll = async (req, res = Response) => {
  try {
    const product = await findAll();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message }); // { message:""}
  }
};

const getById = async(req, res = Response) => {
  try {
    const { id } = req.params;
    const product = await findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const insert = async(req, res = Response ) => {
  try {
    const { title, description, price, stock, id_category} = req.body;
    const product = await save({
        title, description, price, stock, id_category
    });    
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const actualize = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const { title, description, price, stock, id_category } = req.body;
    const product = await update(
      { title, description, price, stock, id_category }, id
    );
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const eliminate = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const product = await remove( id );
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const productsRouter = Router();

productsRouter.get('/', getAll);
productsRouter.get('/:id', getById);
productsRouter.post('/', /* checkRoles([2, 3]), */ insert);
productsRouter.put('/:id', /* checkRoles([2, 3]), */ actualize);
productsRouter.delete('/:id', /* checkRoles([2, 3]), */ eliminate);


module.exports = {
  productsRouter
}
