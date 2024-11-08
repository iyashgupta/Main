const express = require('express');
const { LoginRouter } = require('../Routes/AuthRoutes/LoginRoute');
const { SignUpRouter } = require('./AuthRoutes/SignUpRoute');
const { UniqueUserName } = require('./AuthRoutes/UniqueUserNameRoute');
const authMiddleware = require('../middleware/authMiddleware');

const HomeRoute = express.Router();

// Routes that do not require authentication
HomeRoute.use('/', LoginRouter);
HomeRoute.use('/login', LoginRouter);
HomeRoute.use('/registeruser', SignUpRouter);
HomeRoute.use('/uniqueUserName', UniqueUserName);

// Apply authentication middleware for routes that require it
HomeRoute.use(authMiddleware);

// Routes that require authentication


module.exports = {
  HomeRoute
};
