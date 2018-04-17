import http from "axios";
// import * as Constants from "../constants/Constants";
import * as uuid from "node-uuid";

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
export function logout(args) {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  return http.get("/api/logout", { headers: getHeaders() });
}
