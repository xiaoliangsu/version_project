import fetch from '../axios/http.js';

export function sendVerified(params) {
  return fetch('/admin/apply/sendRegistration?'+params, params,'get')
}
export function AccPass(param) {
  return fetch('/admin/apply/accept',param,"post")
}

