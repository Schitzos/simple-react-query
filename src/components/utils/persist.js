/* eslint-disable consistent-return */

function setPersistance(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getPersistance(key) {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key));
  }
}

function clearPersistance() {
  localStorage.clear();
}

const persist = {
  setPersistance, getPersistance, clearPersistance
};

export default persist;
