import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions/loginActions';
import HeaderLink from '../headerLink';
import routs from '../../routs/routs';

import style from './header.module.scss';

function Header({ data, userLogOut }) {
  const { isLogged, user } = data;
  const { username, image } = user;
  const mySrc = image || 'https://static.productionready.io/images/smiley-cyrus.jpg';
  return (
    <header className={style.header}>
      <Link to={routs.main} className={style.headerLink}>
        Realworld Blog
      </Link>
      {!isLogged && <HeaderLink to={routs.singIn} text="Sing In" />}
      {!isLogged && <HeaderLink to={routs.singUp} text="Sing Up" green="true" />}
      {isLogged && <HeaderLink to={routs.newArticle} text="Create article" green="true" small="true" />}
      {isLogged && (
        <Link to="/profile">
          <div className={style.userCard}>
            <span className={style.userName}>{username}</span>
            <img
              className={style.userImage}
              src={mySrc}
              alt="userPhoto"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = 'https://static.productionready.io/images/smiley-cyrus.jpg';
              }}
            />
          </div>
        </Link>
      )}
      {isLogged && (
        <button type="button" onClick={userLogOut}>
          <HeaderLink text="Log Out" border="true" />
        </button>
      )}
    </header>
  );
}

const mapStateToProps = (state) => ({
  data: state.loginReducer,
});

export default connect(mapStateToProps, actions)(Header);
