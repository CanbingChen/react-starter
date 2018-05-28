import axios from 'axios'; // https://github.com/mzabriskie/axios
import ERROR_CODE from 'CONSTANTS/errorCode';
import 'babel-polyfill';
import toast from 'COMPONENTS/Toast';

const EXTREME_ERR_MSG = {
  INTERNET_ERR: '服务器开小差了，请稍后进行操作',
  SYESTEM_ERROR: '服务器开小差了，请稍后进行操作',
  NO_MATCH: '网络错误',
  OFFLINE_ERR: '网络异常，请稍候重试',
  AUTH_FAIL: '非权限访问',
  AUTHORIZE_TIME_OUT: '登录过期，请重新查询'
};

// const pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// const cancelToken = axios.CancelToken;
// const removePending = config => {
//   for (const p in pending) {
//     if (pending[p].u === `${config.url}&${config.method}`) { // 当当前请求在数组中存在时执行函数体
//       pending[p].f(); // 执行取消操作
//       pending.splice(p, 1); // 把这条记录从数组中移除
//     }
//   }
// }
//
// // 添加请求拦截器
// axios.interceptors.request.use(config => {
//   removePending(config); // 在一个ajax发送前执行一下取消操作
//   config.cancelToken = new cancelToken(c => {
//     // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
//     pending.push({ u: `${config.url}&${config.method}`, f: c });
//   });
//   return config;
// }, error => Promise.reject(error));
//
// // 添加响应拦截器
// axios.interceptors.response.use(response => {
//   removePending(response.config);  // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
//   return response;
// }, error => ({ data: { } }));
/*eslint-disable*/
const interNetErrCodeArr = [20000, 30000, 50000];

const NO_INTERNET_ERROR_CODE = -1;
const INTERNET_OTHER_ERR = 0;
const codes = Object.keys(ERROR_CODE).map(key => ERROR_CODE[key]);

/**
 * 拉取网络请求
 * @param  {[type]} url    [description]
 * @param  {[type]} method [description]
 * @return {[type]}        [description]
 */
export default function fetch(url, method) {
  const headers = {
    'Cache-control':'no-cache',
     'Pragma':'no-cache',
     'Expires': -1};
	return data => {
		let params = method === 'POST' ? {
			method,
			url,
      headers,
			data
		} : {
			method,
			url,
      headers,
			params: data,
		};

		return new Promise((resolve, reject) => {
			axios(params).then(
				response => {
					let responseCode = response.data.code;
					if (responseCode === ERROR_CODE.SUCCESS) {
						resolve(response.data.data);
					} else if (
						interNetErrCodeArr.indexOf(responseCode) !== -1
					) {
						toast.error(EXTREME_ERR_MSG.OFFLINE_ERR);
						reject(response.data);
					}else if (codes.indexOf(responseCode) !== -1) {
						reject(response.data);
					} else {
						let msg =
							response.data.msg ||
							EXTREME_ERR_MSG.NO_MATCH +
								(responseCode ? responseCode : '');
						toast.error(msg);
						reject(response.data);
					}
				},
				err => {
					let isOfflineError =
						err.status === NO_INTERNET_ERROR_CODE ||
						err.status === INTERNET_OTHER_ERR;
					toast.error(
						isOfflineError
							? EXTREME_ERR_MSG.OFFLINE_ERR
							: EXTREME_ERR_MSG.INTERNET_ERR
					);
					reject();
				}
			);
		});
	};
}
