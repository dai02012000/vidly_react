import http from './httpServices';
import jwtDecode from 'jwt-decode';

const apiEndpoint = '/auth';

const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(user) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email: user.username,
    password: user.password
  });
  localStorage.setItem(tokenKey, jwt);
};

export async function loginWithJwt(token) {
  localStorage.setItem(tokenKey, token);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
};

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
}
