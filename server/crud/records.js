const uuidv4 = require("uuid/v4"); // uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
const crud = require("../adaptors/crud");
const tableName = "JoggerAppRecord";

const post = args => {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  let document = (({
    UserId,
    DistanceInMiles,
    TimeDurationInMinutes
  }) => ({
    UserId,
    DistanceInMiles,
    TimeDurationInMinutes
  }))(args);
  return crud.post(tableName, document);
};
/**
 * get user-records. 
 * @param {Object} args.
 * @returns {Promise}. 
 * Returns getAll() if userId missing. 
 * Returns all records of a user if UserId passed and CreatedTimeStamp missing. 
 * Returns single record if UserId and CreatedTimeStamp both passed.
 * Returns record
 */
const get = args => {
  if (!args.UserId) { // if no user-id, return all records across users
    return crud.getAll(tableName);
  }
  if (!args.CreatedTimeStamp) { // if no created-time-stamp, return all records for given user
    return crud.get(tableName, "UserId", args.UserId);
  }
  return crud.get(
    tableName,
    "UserId",
    args.UserId,
    "CreatedTimeStamp",
    Number(args.CreatedTimeStamp)
  ); // else return record for given user created at given timestamp.
};
const remove = args => {
  return crud.remove(
    tableName,
    "UserId",
    args.UserId,
    "CreatedTimeStamp",
    Number(args.CreatedTimeStamp)
  );
};
const put = (keys, args) => {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  let document = (({
    UserId,
    DistanceInMiles,
    TimeDurationInMinutes
  }) => ({
    UserId,
    DistanceInMiles,
    TimeDurationInMinutes
  }))(args);
  return crud.put(
    tableName,
    document,
    "UserId",
    keys.UserId,
    "CreatedTimeStamp",
    Number(keys.CreatedTimeStamp)
  );
};
module.exports = {
  post: post,
  get: get,
  put: put,
  remove: remove
};