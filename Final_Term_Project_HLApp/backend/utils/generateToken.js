/**
 * Purpose: Sign and generate a JWT token for user authentication.
 * Logic: Sign the token with user ID and role using process.env.JWT_SECRET and return it.
 */

const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

module.exports = generateToken;
