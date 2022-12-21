const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { usersRouter, authRouter, productsRouter, promotionsRouter, clientsRouter, categoriesRouter, ordersRouter, providersRouter, rolesRouter } = require('../modules/controller/routes')

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(cors({ origins: "*" }));
app.use(express.json({ limit: "50mb" }));

//http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Está jalando");
});

app.use('/api/providers',providersRouter) //Proveedores
app.use('/api/users', usersRouter); //Empleados
app.use('/api/auth', authRouter); //Auth
app.use('/api/products', productsRouter); //Productos
app.use('/api/promotions', promotionsRouter); //Promociones
app.use('/api/orders', ordersRouter); //Pedidos
app.use('/api/clients', clientsRouter); //Clientes
app.use('/api/categories', categoriesRouter); //Categorias de productos
app.use('/api/roles', rolesRouter); //Roles de empleados

module.exports ={
    app
}
