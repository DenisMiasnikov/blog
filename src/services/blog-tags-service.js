/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class BlogTagsService {
  constructor() {
    this._apiBase = 'https://blog.kata.academy/api/tags';
  }

  async getTags() {
    const res = await fetch(`${this._apiBase}`);

    if (!res.ok) {
      throw new Error(`Could not fetch, recieved ${res.status}`);
    }

    return await res.json();
  }
}
