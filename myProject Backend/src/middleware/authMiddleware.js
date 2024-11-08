const authMiddleware = (req, res, next) => {
    if (!req.headers.token) {
      return res.send({ message: 'Unauthorized User' , status:false });
    }
    next();
  };
  
  module.exports = authMiddleware;