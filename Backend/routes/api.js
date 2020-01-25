const {Router} = require(`express`)
const routes = Router()
const AuthController = require("../Controllers/AuthController");
const PostController = require("../Controllers/PostController");
const TagController = require("../Controllers/TagController");
const requireAuth = require("../Midllewares/AuthMiddleware")

// Authentication Routes
routes.post("/register", AuthController.register);
routes.post("/login", AuthController.login);

// Tags routes
routes.get("/tags", TagController.index);

//Post routes
routes.get("/posts", PostController.index);
routes.post("/posts", requireAuth, PostController.store);
routes.delete("/posts/:id", requireAuth, PostController.destroy);
routes.put("/posts/:id", requireAuth, PostController.update);

module.exports = routes;
