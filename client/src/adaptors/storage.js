export function setItem(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, value);
}

export function getItem(key) {
  return JSON.parse(window.sessionStorage.getItem(key));
}
export function removeItem(key) {
  window.sessionStorage.removeItem(key);
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

