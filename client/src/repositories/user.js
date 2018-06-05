import http from 'axios';
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

/**
 * get
 */
export function read(userId) {
  return http.get(`/api/users/${userId}`, {}, { headers: BaseRepository.getHeaders() });
}

/**
 * get
 */
export function readAll() {
  // console.log('users readAll', request);
  return http.get('/api/users', {}, { headers: BaseRepository.getHeaders() });
}

/**
 * remove
 */
export function remove(userId) {
  return http.delete(`/api/users/${userId}`, {}, { headers: BaseRepository.getHeaders() });
}

/**
 * update
 */
export function update(userId, args) {
  const request = {
    Role: args.Role,
    UserName: args.UserName,
  };
  return http.put(`/api/users/${userId}`, request, { headers: BaseRepository.getHeaders() });
}
