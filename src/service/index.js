import ERROR_CODE from 'CONSTANTS/errorCode';
import { PAGE_URL } from 'CONSTANTS/default';
import store from 'store';

import fetch from './fetch';

const apiService = {
  signin: fetch('/api/signin', 'POST'), // 登录
};

export const permissionFilter = (data, history) => {
  switch (data.code) {
    case ERROR_CODE.PERMISSION_DENIED:
      apiService.logout().then(() => {
        console.log('logout success');
      }, () => {
        console.log('logout failed');
      })
      store.clearAll();
      history.push(PAGE_URL.SIGNIN);
      break;
    default:
      break;
  }
}

export default apiService;
