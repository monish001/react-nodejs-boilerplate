import http from 'axios';
import * as uuid from 'node-uuid';
import * as StorageHelper from '../adaptors/storage';
import * as BaseRepository from './base';

/**
 * @param {object} args
 * @return {Promise}
 */
export function login(args) {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  const request = (({ username, password }) => ({ username, password }))(args);
  return http.post('/api/login', request, { headers: BaseRepository.getHeaders() });
}

/**
 * @param {object} args
 * @return {Promise}
 */
export function register(args) {
  const request = {
    UserName: args.username,
    Password: args.password,
  };
  return http.post('/api/register', request, { headers: BaseRepository.getHeaders() });
}

/**
 * @return {Promise}
 */
export function logout() {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  return http.get('/api/logout', { headers: BaseRepository.getHeaders() });
}

/**
 * getUserId
 */
export function getUserId() {
  const userObj = StorageHelper.getItem('user');
  return userObj && userObj.Id;
}
