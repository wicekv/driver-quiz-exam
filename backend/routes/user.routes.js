const { authJwt } = require("../middlewares");
const { Router } = require('express');
const controller = require("../controllers/user.controller");

const userRouter = Router();

// middleware

userRouter.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// routes
userRouter.get("/questions", [authJwt.verifyToken],  controller.getQuestions);
userRouter.get("/user", [authJwt.verifyToken],  controller.getUser)
userRouter.get("/users", [authJwt.verifyToken],  controller.getUsers)
userRouter.post("/score", [authJwt.verifyToken],  controller.postUserScore)

module.exports = userRouter;