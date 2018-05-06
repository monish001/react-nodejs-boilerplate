import * as uuid from 'node-uuid';

/**
 * @return {Object} headers
 * @summary sets the common headers(X-Tracking-Id) for all request
 */
export function getHeaders() {
  const headers = {
    'X-Tracking-Id': uuid.v1(),
  };
  return headers;
}
