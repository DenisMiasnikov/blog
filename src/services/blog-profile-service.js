/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class BlogProfileService {
  constructor() {
    this._apiBase = 'https://blog.kata.academy/api/profiles/';
  }

  async getProfile(username) {
    const res = await fetch(`${this._apiBase}${username}`);
    if (!res.ok) {
      throw new Error(`Could not fetch , recieved ${res.status}`);
    }

    return await res.json();
  }

  async followProfile(username, token) {
    const res = await fetch(`${this._apiBase}${username}/follow`, {
      method: 'POST',
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

  async unFollowProfile(username, token) {
    const res = await fetch(`${this._apiBase}${username}/follow`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Could not fetch, recieved ${res.status}`);
    }

    return await res.json();
  }
}
