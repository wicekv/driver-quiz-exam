const { Router } = require('express');
const { models } = require('mongoose');

// router imports
const userRouter = require('./user.routes');

const apiRouter = Router();

// Routes

apiRouter.use('/user', userRouter);



module.exports = apiRouter;