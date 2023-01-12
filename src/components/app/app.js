import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from '../header';
import ArticleList from '../articleList';
import Article from '../article';
import SingIn from '../singIn';
import SingUp from '../singUp';
import EditForm from '../editForm';
import EditArticleForm from '../editArticle';
import CreateArticle from '../createArticle';
import ReqAuth from '../hoc';

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
