const {Router} = require(`express`)
const routes = Router()
const AuthController = require("../Controllers/AuthController");
const PostController = require("../Controllers/PostController");
const TagController = require("../Controllers/TagController");
const requireAuth = require("../Midllewares/AuthMiddleware")
const multer = require("../Midllewares/MulterMiddleware");
// Authentication Routes
routes.post("/register", multer.single("profile_image"), AuthController.register);
routes.post("/login", AuthController.login);
routes.get("/user", requireAuth, AuthController.find)
// Tags routes
routes.get("/tags", TagController.index);

//Post routes
routes.get("/posts", PostController.index);
routes.post("/posts", requireAuth, multer.single("post_image"), PostController.store);
routes.delete("/posts/:id", requireAuth, PostController.destroy);
routes.put("/posts/:id", requireAuth, multer.single("post_image"), PostController.update);

module.exports = routes;
