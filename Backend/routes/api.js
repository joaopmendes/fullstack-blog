const {Router} = require(`express`)
const routes = Router()
const AuthController = require("../Controllers/AuthController");
const requireAuth = require("../Midllewares/AuthMiddleware")
routes.post("/register", AuthController.register);
routes.get("/protectedRoute", requireAuth, (req, res) => {
    return res.status(200).json({test: req.user})
});
module.exports = routes;
