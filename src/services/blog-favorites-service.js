/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class BlogFavoritesService {
  constructor() {
    this._apiBase = 'https://blog.kata.academy/api/';
    this._likeRequest = async (method, url, token, data) => {
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

      return await res.json();
    };
  }

  async favoriteArticle(token, slug) {
    return this._likeRequest('POST', `${this._apiBase}articles/${slug}/favorite`, token);
  }

  async unFavoriteArticle(token, slug) {
    return this._likeRequest('DELETE', `${this._apiBase}articles/${slug}/favorite`, token);
  }
}
