/* eslint-disable array-callback-return */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
import { makeError } from '../utils/utils';

export default class BlogUserService {
  constructor() {
    this._apiBase = 'https://blog.kata.academy/api/';
    this._baseRequest = async (method, url, token, data) => {
      const res = await fetch(url, {
        method: `${method}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Could not fetch, recieved ${res.status}`);
      }
      if (method === 'DELETE') {
        return await res;
      }
      return await res.json();
    };
    this._userRequest = async (method, url, data, fn, token) => {
      const res = await fetch(url, {
        method: `${method}`,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Accept: token ? 'application/json' : null,
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : null,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorBody = await res.json();
        makeError(errorBody, fn);
      }

      return await res.json();
    };
  }

  async getUser(token) {
    return this._baseRequest('GET', `${this._apiBase}user`, token);
  }

  async singUp(userData, fn) {
    const data = {
      user: userData,
    };

    return this._userRequest('POST', `${this._apiBase}users`, data, fn);
  }

  async singIn(email, password, fn) {
    const data = {
      user: {
        email: `${email}`,
        password: `${password}`,
      },
    };

    return this._userRequest('POST', `${this._apiBase}users/login`, data, fn);
  }

  async updateUser(token, userData, fn) {
    const data = {
      user: userData,
    };

    return this._userRequest('PUT', `${this._apiBase}user`, data, fn, token);
  }
}
