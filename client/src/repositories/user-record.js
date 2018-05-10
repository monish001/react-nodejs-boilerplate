import http from 'axios';
// import * as Constants from "../constants/Constants";
import * as uuid from 'node-uuid';
import * as UserRepository from './user';
import * as BaseRepository from './base';

/**
 * get
 */
export function get() {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  const request = {
    UserId: UserRepository.getUserId(),
  };
  return http.get(`/api/users/${UserRepository.getUserId()}/records`, request, { headers: BaseRepository.getHeaders() });
}

/**
 * createRecord
 */
export function create(args) {
  // See https://stackoverflow.com/a/39333479/989139 for help on syntax
  const request = {
    UserId: UserRepository.getUserId(),
    DistanceInMiles: args.distance,
    TimeDurationInMinutes: args.time,
  };
  return http.post(`/api/users/${UserRepository.getUserId()}`, request, { headers: BaseRepository.getHeaders() });
}

