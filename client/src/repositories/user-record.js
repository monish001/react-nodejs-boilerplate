import http from 'axios';
import * as StorageHelper from './../adaptors/storage';
import * as BaseRepository from './base';

/**
 * get
 */
export function read(createdTimeStamp, createdTimeStampFrom, createdTimeStampTo) {
  const userId = StorageHelper.getUserId();
  const userRole = StorageHelper.getUserRole();
  const isRegularUserRole = (userRole === 'REGULAR_USER');
  const request = {
    UserId: userId,
    CreatedTimeStamp: createdTimeStamp,
    CreatedTimeStampFrom: createdTimeStampFrom,
    CreatedTimeStampTo: createdTimeStampTo,
  };
  // console.log('records get', request);
  const url = isRegularUserRole ? `/api/users/${userId}/records` : '/api/records';
  return http.get(url, { params: request }, { headers: BaseRepository.getHeaders() });
}

/**
 * createRecord
 */
export function create(args) {
  const userId = StorageHelper.getUserId();
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
  const userId = StorageHelper.getUserId();
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
  const userId = StorageHelper.getUserId();
  const request = {
    DistanceInMiles: data.distanceInMiles,
    TimeDurationInMinutes: data.timeDurationInMinutes,
  };
  return http.put(`/api/users/${userId}/records?UserId=${userId}&CreatedTimeStamp=${createdTimeStamp}`, request, { headers: BaseRepository.getHeaders() });
}
