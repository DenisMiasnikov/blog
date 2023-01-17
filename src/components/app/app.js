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
import routs from '../../routs/routs';

function App({ data }) {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={routs.articles} element={<ArticleList />} />
        <Route path={routs.main} element={<Navigate to={routs.articles} replace />} />
        <Route path={`${routs.articles}/:id`} element={<Article />} />
        <Route path={routs.singIn} element={<SingIn />} />
        <Route path={routs.singUp} element={<SingUp />} />
        <Route
          path={routs.editProfile}
          element={
            <ReqAuth>
              <EditForm />
            </ReqAuth>
          }
        />
        <Route
          path={routs.newArticle}
          element={
            <ReqAuth>
              <CreateArticle />
            </ReqAuth>
          }
        />
        <Route
          path={`${routs.articles}/:id/edit`}
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
