import moment from 'moment';

const KEY = 'sh-user-token';

let token = '';

const setToken = (nextToken: string) => {
  Promise.resolve().then(() => {
    localStorage.setItem(KEY, nextToken);
    document.cookie = `user-token=${nextToken}; expires=${moment()
      .add(1, 'years')
      .toDate()
      .toUTCString()}`;
  });
  token = nextToken;
};

const getToken = () => {
  // eslint-disable-next-line no-return-assign
  return token || (token = localStorage.getItem(KEY) || '');
};

const clearToken = () => {
  token = '';
  document.cookie = `user-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  localStorage.removeItem(KEY);
};

const hasToken = () => !!localStorage.getItem(KEY);

const tokenUtils = {
  setToken,
  getToken,
  clearToken,
  hasToken,
};

export default tokenUtils;
