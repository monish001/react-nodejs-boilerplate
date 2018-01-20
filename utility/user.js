const bcrypt = require('bcrypt');
const CONSTANTS = require('../constants/common');
const verifyPassword = (user, passwordHash) => {
  let isMatch = false;
  if(user.Password && (typeof user.Password).toLowerCase() === "string") {
    // TODO: Why is async mode recommended over sync mode?   
    // https://www.npmjs.com/package/bcrypt#why-is-async-mode-recommended-over-sync-mode
    isMatch = bcrypt.compareSync(passwordHash, user.Password); 
  }
  return isMatch;
};
module.exports = { verifyPassword: verifyPassword };
