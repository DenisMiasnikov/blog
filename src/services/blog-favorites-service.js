/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class BlogFavoritesService {
  constructor() {
    this._apiBase = 'https://blog.kata.academy/api/articles/';
  }

  async favoriteArticle(token, slug) {
    const res = await fetch(`${this._apiBase}${slug}/favorite`, {
      method: 'POST',
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

  async unFavoriteArticle(token, slug) {
    const res = await fetch(`${this._apiBase}${slug}/favorite`, {
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
