const {Router} = require(`express`)
const routes = Router()
const AuthController = require("../Controllers/AuthController");
const PostController = require("../Controllers/PostController");
const requireAuth = require("../Midllewares/AuthMiddleware")

// Authentication Routes
routes.post("/register", AuthController.register);
routes.post("/login", AuthController.login);
// routes.get("/protectedRoute", requireAuth, (req, res) => {
//     return res.status(200).json({test: req.user})
// });

routes.get("/posts", PostController.index);
routes.post("/posts", requireAuth, PostController.store);
routes.delete("/posts/:id", requireAuth, PostController.destroy);

module.exports = routes;
