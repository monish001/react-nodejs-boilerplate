const uuidv4 = require("uuid/v4"); // uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
const crud = require("../adaptors/crud");
const tableName = "JoggerAppRecord";
const post = args => {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  let document = (({ UserId, DistanceInMiles, TimeDurationInMinutes }) => ({
    UserId,
    DistanceInMiles,
    TimeDurationInMinutes
  }))(args);
  return crud.post(tableName, document);
};
const get = args => {
  if (!args.UserId) {
    return crud.getAll(tableName);
  }
  return args.CreatedTimeStamp
    ? crud.get(
        tableName,
        "UserId",
        args.UserId,
        "CreatedTimeStamp",
        Number(args.CreatedTimeStamp)
      )
    : crud.get(tableName, "UserId", args.UserId);
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
  let document = (({ UserId, DistanceInMiles, TimeDurationInMinutes }) => ({
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
