const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const { findAll, findById } = require("./roles.gateway");

const getAll = async (req, res = Response) => {
  try {
    const role = await findAll();
    res.status(200).json(role);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message }); // { message:""}
  }
};

const getById = async(req, res = Response) => {
    try {
      const { id } = req.params;
      const role = await findById(id);
      res.status(200).json(role);
    } catch (error) {
      console.log(error)
      const message = validateError(error);
      res.status(400).json({ message });
    }
  }

const rolesRouter = Router();

rolesRouter.get('/', getAll);
rolesRouter.get('/:id', getById);

module.exports = {
    rolesRouter
}