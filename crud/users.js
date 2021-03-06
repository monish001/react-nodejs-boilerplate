const bcrypt = require('bcrypt');
const CONSTANTS = require('../constants/common');
const uuidv4 = require("uuid/v4"); // uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
const crud = require("../adaptors/crud");
const tableName = "JoggerAppUser";
const post = args => {
  let document = (({ UserName, Password }) => ({ UserName, Password }))(args) // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  document.Id = uuidv4();
  document.Role = CONSTANTS.ROLES_REGULAR_USER; // REGULAR_USER | ADMIN | MANAGER
  const encryptedPassword = bcrypt.hashSync(document.Password, CONSTANTS.BCRYPT_ROUNDS);
  document.Password = encryptedPassword;
  return crud.post(tableName, document);
};
const findOne = (partitionKey, partitionValue, sortKey, sortValue) => {
  const indexName = partitionKey + "-index";
  const promise1 = new Promise(function(resolve, reject) {
    crud
      .getByAttribute(
        tableName,
        indexName,
        partitionKey,
        partitionValue,
        sortKey,
        sortValue
      )
      .then(userList => {
          userList.length === 1 ? resolve(userList[0]) : reject();
      })
      .catch(err => reject(err));
  });
  return promise1;
};

const get = args => {
  return args.Id ? crud.get(tableName, "Id", args.Id) : crud.getAll(tableName);
};
const remove = id => {
  return crud.remove(tableName, "Id", id);
};
const put = (id, args) => {
  let document = (({ UserName, Password }) => ({ UserName, Password }))(args) // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  
  // TODO. Password reset & Role change later.
  // if(document.Password) { 
  //   const encryptedPassword = bcrypt.hashSync(document.Password, CONSTANTS.BCRYPT_ROUNDS);
  //   document.Password = encryptedPassword;
  // }
  
  return crud.put(tableName, document, "Id", id);
};
module.exports = {
  post: post,
  get: get,
  findOne: findOne,
  put: put,
  remove: remove
};
