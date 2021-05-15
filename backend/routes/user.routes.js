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

userRouter.get("/all", controller.allAccess);
userRouter.get("/stats", controller.statsBoard);
userRouter.get("", [authJwt.verifyToken], controller.userBoard);

// userRouter.get(
//   "/api/test/admin",
//   [authJwt.verifyToken, authJwt.isAdmin],
//   controller.adminBoard
// );

module.exports = userRouter;