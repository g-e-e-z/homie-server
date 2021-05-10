const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET_CODE } = require("../config");

module.exports = (context) => {
  // Context contains and object which will include headers
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Convention : token has "Bearer ..."
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_CODE);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/ Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
