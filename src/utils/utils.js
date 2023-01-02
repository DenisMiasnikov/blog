/* eslint-disable array-callback-return */
export const getArticleProps = (data, id) => data.filter((article) => article.slug === id)[0];

export const getOffset = (actPage) => (actPage - 1) * 20;

export const makeError = (errorBody, fn) => {
  const keys = Object.keys(errorBody.errors);
  keys.map((key) => {
    const message = `${key}`[0].toUpperCase() + `${key}`.substring(1).toLowerCase();
    fn(`${key}`, {
      type: 'required',
      message: `${message} ${errorBody.errors[`${key}`]}`,
    });
  });
};
