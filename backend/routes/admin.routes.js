const { Router } = require('express');
const { authJwt } = require('../middlewares');
const controller = require("./../controllers/admin.contoller");

const adminRouter = Router();


adminRouter.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  // routes
  
  adminRouter.post("/questions", [authJwt.verifyToken],  controller.addQuestion);

module.exports = adminRouter;