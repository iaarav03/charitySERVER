const jwt = require('jsonwebtoken'); // Make sure you have this line at the beginning

async function Auth(req, res, next) {
  try {
    const token = req.header('Authorization').split(' ')[1]; // Correct the header field name

    const decodedtoken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedtoken;
    // res.json(decodedtoken); // You might want to remove this line to prevent multiple responses
    next();
  } catch (error) {
    res.send('Auth failed');
  }
}

module.exports = Auth;
