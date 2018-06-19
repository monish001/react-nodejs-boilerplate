export function setItem(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  _storage.setItem(key, value);
}

export function getItem(key) {
  return JSON.parse(_storage.getItem(key));
}

export function removeItem(key) {
  _storage.removeItem(key);
}

/**
 * getUserId
 */
export function getUserId() {
  const userObj = getItem('user');
  return userObj && userObj.Id;
}

/**
 * getUserRole
 */
export function getUserRole() {
  const userObj = getItem('user');
  return userObj && userObj.Role;
}

