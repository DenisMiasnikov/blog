/* eslint-disable default-param-last */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
import Error from '../components/error';

export default class BlogArticlesService {
  constructor() {
    this._apiBase = 'https://blog.kata.academy/api/articles';
  }

  async getFollowRecent(token) {
    const res = await fetch(`${this._apiBase}/feed`, {
      method: 'GET',
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

  async getGlobalRecent(token, offset) {
    const res = await fetch(`${this._apiBase}?offset=${offset}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Could not fetch, recieved ${res.status}`);
    }

    return await res.json();
  }

  async getAnArticle(slug, token) {
    const res = await fetch(`${this._apiBase}/${slug}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Could not fetch, recieved ${res.status}`);
    }
    return await res.json();
  }

  async createArticle(token, data) {
    const res = await fetch(`${this._apiBase}`, {
      method: 'POST',
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

    return await res.json();
  }

  async updateArticle(token, id, data) {
    const res = await fetch(`${this._apiBase}/${id}`, {
      method: 'PUT',
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

    return await res.json();
  }

  async deleteArticle(token, slug) {
    const res = await fetch(`${this._apiBase}/${slug}`, {
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
    return await res;
  }
}
