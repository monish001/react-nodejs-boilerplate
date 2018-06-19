export function getWeekStartEndDates() {
  let now = new Date();
  now = new Date(now.getTime() -
    (now.getMilliseconds() +
      (1000 * now.getSeconds()) +
      (1000 * 60 * now.getMinutes()) +
      (1000 * 60 * 60 * now.getHours())));
  const startDay = 1; // 0=sunday, 1=monday etc.
  const d = now.getDay(); // get the current day
  // rewind to start day
  const weekStart = new Date(now.valueOf() - ((d <= 0 ? 7 - startDay : d - startDay) * 86400000));
  // add 7 days minus 1ms to get last day
  const weekEnd = new Date((weekStart.valueOf() + (7 * 86400000)) - 1);
  return {
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
  };
}

/*
 * @summary checks if given storage is operable
 * @credits Dmitry
 * @source https://gist.github.com/juliocesar/926500
 */
function IsStoragePresent(storage) {
  const mod = 'compatTest';
  try {
    storage.setItem(mod, mod);
    storage.getItem(mod);
    storage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
}

/*
 * @summary initializes window._storage with browser sessionStorage 
 * if present, with polyfill otherwise.
 * @credits Dmitry
 * @source https://gist.github.com/juliocesar/926500
 */
export function SetupSessionStorage() {
  let data = {};

  window._storage = window.sessionStorage;

  if (!IsStoragePresent(window.sessionStorage)) {
    window._storage = {
      setItem(id, val) { data[id] = String(val); return data[id]; },
      getItem(id) { return data.hasOwnProperty(id) ? data[id] : null; },
      removeItem(id) { return delete data[id]; },
      clear() { data = {}; return data; },
    };
  }
}