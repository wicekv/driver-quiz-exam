const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { Router } = require('express');

const authRouter = Router();

// middleware

  authRouter.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // routes
  
  authRouter.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  authRouter.post("/signin", controller.signin);

  module.exports = authRouter;