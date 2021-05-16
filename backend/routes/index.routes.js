const { Router } = require('express');
const { models } = require('mongoose');

// router imports
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const adminRouter = require('./admin.routes');

const apiRouter = Router();

// Routes

apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/admin', adminRouter);

module.exports = apiRouter;