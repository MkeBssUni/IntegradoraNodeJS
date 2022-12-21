const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const { findAll, findById, save, update, remove } = require("./orders.gateway");

const getAll = async (req, res = Response) => {
  try {
    const order = await findAll();
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message }); // { message:""}
  }
};

const getById = async(req, res = Response) => {
  try {
    const { id } = req.params;
    const order = await findById(id);
    res.status(200).json(order);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const insert = async(req, res = Response ) => {
  try {
    const { description, date_order, total, id_client, id_user } = req.body;
    const order = await save({
        description, date_order, total, id_client, id_user
    });    
    res.status(200).json(order);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const actualize = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const { description, date_order, total, id_client, id_user} = req.body;
    const order = await update(
      { description, date_order, total, id_client, id_user }, id
    );
    res.status(200).json(order);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const eliminate = async( req, res = Response ) => {
  try {
    const { id } = req.params;
    const order = await remove( id );
    res.status(200).json(order);
  } catch (error) {
    console.log(error)
    const message = validateError(error);
    res.status(400).json({ message });
  }
}

const ordersRouter = Router();

ordersRouter.get('/', getAll);
ordersRouter.get('/:id', getById);
ordersRouter.post('/', insert);
ordersRouter.put('/:id', actualize);
ordersRouter.delete('/:id', eliminate);


module.exports = {
  ordersRouter
}
