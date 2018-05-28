import queryString from 'query-string';
// import store from 'store';
// import apiService from 'SERVICE';
// import STORE_KEY from 'CONSTANTS/storeKey';

import is from './is'

export function emptyFilter(str) {
  if (is.empty(str)) { return '--'; }
  return str;
}
export function splitString(str, len) {
  if (str.length <= len) { return str; }
  return `${str.substring(0, len)}...`
}
export function paramsObject(str) {
  return queryString.parse(str);
}
export function paramsString(obj) {
  return queryString.stringify(obj);
}

// 根据分子分母计算比率，返回百分比形式
export function backRatio(molecule, denominator) {
  if (is.empty(molecule) || is.empty(denominator)) return '--';
  if (denominator === 0) return '--';
  return `${(molecule / denominator * 100).toFixed(2)}%`
}
// 返回数字百分比形式
export function backNumToRatio(num) {
  if (typeof num !== 'number' || num === -1) return '--';
  return `${(num * 100).toFixed(2)}%`
}

// 数组分块
export function arrayChunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}
