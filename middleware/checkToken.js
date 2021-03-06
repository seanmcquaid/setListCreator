const config = require("../config/config");
const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return await res.status(401).send({
      errorMessage: "Invalid token",
    });
  }

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    req.token = decodedToken;
    next();
  } catch (err) {
    return await res.status(401).send({
      errorMessage: "Expired Token",
    });
  }
};

module.exports = checkToken;
