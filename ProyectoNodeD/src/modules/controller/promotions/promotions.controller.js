const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const { findAll, findById, save, update, remove } = require("./promotions.gateway");
const { auth, checkRoles } = require('../../../config/jwt')

const getAll = async (req, res = Response) => {
  try {
    const promo = await findAll();
    res.status(200).json(promo);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message }); // { message:""}
  }
};

const getById = async(req, res = Response) => {
  try {
    const { id } = req.params;
    const promo = await findById(id);
    res.status(200).json(promo);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const insert = async(req, res = Response ) => {
  try {
    const { title, description,start_date,end_date } = req.body;
    const promo = await save({
      title, description,start_date,end_date
    });    
    res.status(200).json(promo);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const actualize = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const { title, description,start_date,end_date } = req.body;
    const promo = await update(
      { title, description,start_date,end_date }, id
    );
    res.status(200).json(promo);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const eliminate = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const promo = await remove( id );
    res.status(200).json(promo);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const promotionsRouter = Router();

promotionsRouter.get('/', getAll);
promotionsRouter.get('/:id', getById);
promotionsRouter.post('/', /* checkRoles([2, 3]), */ insert);
promotionsRouter.put('/:id', /* checkRoles([2, 3]), */ actualize);
promotionsRouter.delete('/:id', /* checkRoles([2, 3]), */ eliminate);


module.exports = {
  promotionsRouter
}
