const { usersRouter } = require('./users/users.controller')
const { authRouter } = require('./auth/auth.controller')
const { providersRouter } = require('./providers/providers.controller')
const { productsRouter } = require('./products/products.controller')
const { promotionsRouter } = require('./promotions/promotions.controller')
const { ordersRouter } = require('./orders/orders.controller')
const { clientsRouter } = require('./clients/clients.controller')
const { categoriesRouter } = require('./categories/categories.controller')
const { rolesRouter } = require('./roles/roles.controller')

module.exports ={
    usersRouter,
    authRouter,
    providersRouter,
    productsRouter,
    promotionsRouter,
    ordersRouter,
    clientsRouter,
    categoriesRouter,
    rolesRouter
}