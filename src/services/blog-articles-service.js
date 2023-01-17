/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
import Error from '../components/error';

export default class BlogArticlesService {
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
  }

  getGlobalRecent(token, offset) {
    return this._baseRequest('GET', `${this._apiBase}articles?offset=${offset}`, token);
  }

  getAnArticle(slug, token) {
    return this._baseRequest('GET', `${this._apiBase}articles/${slug}`, token);
  }

  createArticle(token, data) {
    return this._baseRequest('POST', `${this._apiBase}articles`, token, data);
  }

  updateArticle(token, id, data) {
    return this._baseRequest('PUT', `${this._apiBase}articles/${id}`, token, data);
  }

  deleteArticle(token, slug) {
    return this._baseRequest('DELETE', `${this._apiBase}articles/${slug}`, token);
  }
}
