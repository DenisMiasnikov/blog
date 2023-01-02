/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class BlogCommentsService {
  constructor() {
    this._apiBase = 'https://blog.kata.academy/api/articles/';
  }

  async getComment(token, slug) {
    const res = await fetch(`${this._apiBase}${slug}/comments`, {
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

  async createComment(token, slug, comment) {
    const data = {
      comment: {
        body: `${comment}`,
      },
    };
    const res = await fetch(`${this._apiBase}${slug}/comments`, {
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

  async deleteComment(token, slug, id) {
    const res = await fetch(`${this._apiBase}${slug}/comments/${id}`, {
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
