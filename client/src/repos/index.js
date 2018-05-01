import http from "axios";
// import * as Constants from "../constants/Constants";
import * as uuid from "node-uuid";
import * as StorageHelper from "../adaptors/storage";

/**
 * @return {Object} headers
 * @summary sets the common headers(X-Tracking-Id) for all request
 */
function getHeaders() {
  let headers = {
    "X-Tracking-Id": uuid.v1()
  };
  return headers;
}

/**
 * @param {object} args
 * @return {Promise}
 */
export function login(args) {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  let request = (({ username, password }) => ({ username, password }))(args) 
  return http.post("/api/login", request, { headers: getHeaders() });
}

/**
 * @param {object} args
 * @return {Promise}
 */
export function register(args) {
  const request = {	
    "UserName": args.username,
    "Password": args.password
  };
  return http.post("/api/register", request, { headers: getHeaders() });
}

/**
 * @return {Promise}
 */
export function logout() {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  return http.get("/api/logout", { headers: getHeaders() });
}

/**
 */
export function getUserId() {
  return StorageHelper.getItem('user').Id;
}

/**
 * 
 */
export function createRecord(args) {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  let request = {
    "UserId": getUserId(),
    "DistanceInMiles": args.distance,
    "TimeDurationInMinutes": args.time
  };
  return http.post("/api/users/" + getUserId(), request, { headers: getHeaders() });  
}
