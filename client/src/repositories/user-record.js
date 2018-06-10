import http from 'axios';
import * as StorageHelper from './../adaptors/storage';
import * as BaseRepository from './base';

/**
 * get
 */
export function read(userId, createdTimeStamp, createdTimeStampFrom, createdTimeStampTo) {
  const userRole = StorageHelper.getUserRole();
  const isRegularUserRole = (userRole === 'REGULAR_USER');
  const url = isRegularUserRole ? `/api/users/${userId}/records` : '/api/records';
  const request = {
    UserId: userId,
    CreatedTimeStamp: createdTimeStamp,
    CreatedTimeStampFrom: createdTimeStampFrom,
    CreatedTimeStampTo: createdTimeStampTo,
  };
  // console.log('records get', request);
  return http.get(url, { params: request }, { headers: BaseRepository.getHeaders() });
}

/**
 * createRecord
 */
export function create(args) {
  const { userId } = args;
  const userRole = StorageHelper.getUserRole();
  const isRegularUserRole = (userRole === 'REGULAR_USER');
  const url = isRegularUserRole ? `/api/users/${userId}/records` : '/api/records';
  const request = {
    UserId: userId,
    DistanceInMiles: args.distance,
    TimeDurationInMinutes: args.time,
  };
  return http.post(url, request, { headers: BaseRepository.getHeaders() });
}

/**
 * remove
 */
export function remove(userId, createdTimeStamp) {
  const userRole = StorageHelper.getUserRole();
  const isRegularUserRole = (userRole === 'REGULAR_USER');
  const url = isRegularUserRole ? `/api/users/${userId}/records` : '/api/records';
  const request = {
    UserId: userId,
    CreatedTimeStamp: createdTimeStamp,
  };
  return http.delete(url, { params: request }, { headers: BaseRepository.getHeaders() });
}

/**
 * update
 */
export function update(userId, createdTimeStamp, data) {
  const userRole = StorageHelper.getUserRole();
  const isRegularUserRole = (userRole === 'REGULAR_USER');
  const url = isRegularUserRole ? `/api/users/${userId}/records` : '/api/records';
  const request = {
    DistanceInMiles: data.distanceInMiles,
    TimeDurationInMinutes: data.timeDurationInMinutes,
  };
  return http.put(`${url}?UserId=${userId}&CreatedTimeStamp=${createdTimeStamp}`, request, { headers: BaseRepository.getHeaders() });
}
