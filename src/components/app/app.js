import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from '../header';
import ArticleList from '../articleList';
import Article from '../article';
import SingIn from '../singIn';
import SingUp from '../singUp';
import EditForm from '../editForm';
import ArticleForm from '../articleForm';
import EditArticleForm from '../editArticle';
import CreateArticle from '../createArticle';
import ReqAuth from '../hoc';
import BlogUserService from '../../services/blog-services';
import BlogProfileService from '../../services/blog-profile-service';
import BlogArticlesService from '../../services/blog-articles-service';
import BlogCommentsService from '../../services/blog-comment-service';
import BlogFavoritesService from '../../services/blog-favorites-service';
import BlogTagsService from '../../services/blog-tags-service';

const blog = new BlogUserService();
const profile = new BlogProfileService();
const articles = new BlogArticlesService();
const token = localStorage.getItem('token');
const comment = new BlogCommentsService();
const favorite = new BlogFavoritesService();
const tag = new BlogTagsService();
// if (!token)
//   blog.singIn('babun008@mail.ru', '123321').then((user) => {
//     localStorage.setItem('token', user.user.token);
//   });
if (token) {
  // blog.getUser(token).then((res) => {
  //   console.log(res);
  // });
  // blog.updateUser(token, 'babun009@mail.ru', '188481', 'Denis', '', '').then((updated) => {
  //   console.log(updated);
  // });
  // profile.getProfile('dan').then((res) => {
  //   console.log(res);
  // });
  // profile.followProfile('dan', token).then((res) => {
  //   console.log(res);
  // });
  // profile.unFollowProfile('dan', token).then((res) => {
  //   console.log(res);
  // });
  // articles.getGlobalRecent().then((res) => {
  //   console.log(res);
  // });
  // articles.getFollowRecent(token).then((res) => {
  //   console.log(res);
  // });
  // articles.getAnArticle('vcgfds-w8vbwi').then((res) => {
  //   console.log(res);
  // });
  // articles.createArticle(token, 'title', 'description', 'body', 'tagList').then((res) => {
  //   console.log(res);
  // });
  // articles.updateArticle(token, 'title-7ra07f', 'newtitle', 'newdescription', 'newbody').then((res) => {
  //   console.log(res);
  // });
  // articles
  //   .deleteArticle(token, 'title-oxqiq9')
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // comment.createComment(token, 'title-rosixx', 'newcomment').then((res) => {
  //   console.log(res);
  // });
  // comment.getComment(token, 'title-rosixx').then((res) => {
  //   console.log(res);
  // });
  // comment.deleteComment(token, 'title-rosixx', '63ac57332075941b00e47e6a').then((res) => {
  //   console.log(res);
  // });
  // favorite.favoriteArticle(token, 'title-idcorz').then((res) => {
  //   console.log(res);
  // });
  // favorite.unFavoriteArticle(token, 'title-idcorz').then((res) => {
  //   console.log(res);
  // });
  // tag.getTags().then((res) => {
  //   console.log(res);
  // });
}

// import styles from './app.module.scss';

function App({ data }) {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/article" element={<ArticleList />} />
        <Route path="/" element={<Navigate to="/article" replace />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/sing-in" element={<SingIn />} />
        <Route path="/sing-up" element={<SingUp />} />
        <Route
          path="/profile"
          element={
            <ReqAuth>
              <EditForm />
            </ReqAuth>
          }
        />
        <Route
          path="/new-article"
          element={
            <ReqAuth>
              <CreateArticle />
            </ReqAuth>
          }
        />
        <Route
          path="/articles/:id/edit"
          element={
            <ReqAuth>
              <EditArticleForm />
            </ReqAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  data: state,
});

export default connect(mapStateToProps)(App);
