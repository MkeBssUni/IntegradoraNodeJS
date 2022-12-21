const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const { findAll, findById, save, update, remove } = require("./categories.gateway");
const { auth, checkRoles } = require('../../../config/jwt')

const getAll = async (req, res = Response) => {
  try {
    const category = await findAll();
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message }); // { message:""}
  }
};

const getById = async(req, res = Response) => {
  try {
    const { id } = req.params;
    const category = await findById(id);
    res.status(200).json(category);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const insert = async(req, res = Response ) => {
  try {
    const { title} = req.body;
    const category= await save({
        title
    });    
    res.status(200).json(category);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const actualize = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const category = await update(
      { title }, id
    );
    res.status(200).json(category);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const eliminate = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const category = await remove( id );
    res.status(200).json(category);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const categoriesRouter = Router();

categoriesRouter.get('/', getAll);
categoriesRouter.get('/:id', getById);
categoriesRouter.post('/', /* checkRoles([3]), */ insert);
categoriesRouter.put('/:id', /* checkRoles([3]), */ actualize);
categoriesRouter.delete('/:id', /* checkRoles([3]), */ eliminate);


module.exports = {
  categoriesRouter
}
