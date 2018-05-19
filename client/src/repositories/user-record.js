import http from 'axios';
// import * as Constants from "../constants/Constants";
import * as uuid from 'node-uuid';
import * as UserRepository from './user';
import * as BaseRepository from './base';

/**
 * get
 */
export function read(createdTimeStamp) {
  const userId = UserRepository.getUserId();
  const request = {
    UserId: userId,
    CreatedTimeStamp: createdTimeStamp,
  };
  // console.log('records get', request);
  return http.get(`/api/users/${userId}/records`, { params: request }, { headers: BaseRepository.getHeaders() });
}

/**
 * createRecord
 */
export function create(args) {
  const userId = UserRepository.getUserId();
  const request = {
    UserId: userId,
    DistanceInMiles: args.distance,
    TimeDurationInMinutes: args.time,
  };
  return http.post(`/api/users/${userId}/records`, request, { headers: BaseRepository.getHeaders() });
}

/**
 * remove
 */
export function remove(createdTimeStamp) {
  const userId = UserRepository.getUserId();
  const request = {
    UserId: userId,
    CreatedTimeStamp: createdTimeStamp,
  };
  return http.delete(`/api/users/${userId}/records`, { params: request }, { headers: BaseRepository.getHeaders() });
}

/**
 * update
 */
export function update(createdTimeStamp, data) {
  const userId = UserRepository.getUserId();
  const request = {
    DistanceInMiles: data.distanceInMiles,
    TimeDurationInMinutes: data.timeDurationInMinutes,
  };
  return http.put(`/api/users/${userId}/records?UserId=${userId}&CreatedTimeStamp=${createdTimeStamp}`, request, { headers: BaseRepository.getHeaders() });
}
