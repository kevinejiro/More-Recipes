import jwt from 'jsonwebtoken';
/**
 * @returns {INTEGER} userId
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyUserSession = (req, res, next) => {
  const token = req.headers.token || req.body.token || req.query.token;
  // if no token found -->
  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'An authorization token is required!'
    });
  } // Check if token matches the one provided at login or signup
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'fail',
          message: 'Session has expired, Please sign-in again'
        });
      }
      return res.status(401).json({
        status: 'fail',
        message: 'Failed to authenticate token'
      });
    }
    req.userId = decoded.user.id;
    next();
  });
};

export default verifyUserSession;
