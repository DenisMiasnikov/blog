/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
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

  async getGlobalRecent(offset = 0) {
    const res = await fetch(`${this._apiBase}?offset=${offset}`);

    if (!res.ok) {
      throw new Error(`Could not fetch, recieved ${res.status}`);
    }

    return await res.json();
  }

  async getAnArticle(slug) {
    const res = await fetch(`${this._apiBase}/${slug}`);

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
    // const data = {
    //   article: {
    //     title: `${title}`,
    //     description: `${description}`,
    //     body: `${body}`,
    //   },
    // };
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
