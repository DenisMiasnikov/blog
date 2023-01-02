/* eslint-disable array-callback-return */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
import { makeError } from '../utils/utils';

export default class BlogUserService {
  constructor() {
    this._apiBase = 'https://blog.kata.academy/api';
  }

  async getUser(token) {
    const res = await fetch(`${this._apiBase}/user`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Could not fetch , recieved ${res.status}`);
    }

    return await res.json();
  }

  async singUp(userData, fn) {
    const data = {
      user: userData,
    };

    const res = await fetch(`${this._apiBase}/users`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
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
  }

  async singIn(email, password, fn) {
    const data = {
      user: {
        email: `${email}`,
        password: `${password}`,
      },
    };

    const res = await fetch(`${this._apiBase}/users/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      // console.log(errorBody);
      makeError(errorBody, fn);
    }
    return await res.json();
  }

  async updateUser(token, userData, fn) {
    const data = {
      user: userData,
    };

    const res = await fetch(`${this._apiBase}/user`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
  }
}
