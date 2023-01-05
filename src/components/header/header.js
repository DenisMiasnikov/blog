import React from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import * as actions from '../../actions/loginActions';
import LogButton from '../logButton';
import photo from '../articleItem/photo.svg';

import style from './header.module.scss';

function Header({ data, userLogOut }) {
  const { isLogged, user } = data;
  const { username, image } = user;
  return (
    <header className={style.header}>
      <Link to="/" className={style.headerLink}>
        Realworld Blog
      </Link>
      {!isLogged && <LogButton to="/sing-in" text="Sing In" />}
      {!isLogged && <LogButton to="/sing-up" text="Sing Up" green="true" />}
      {isLogged && <LogButton to="/new-article" text="Create article" green="true" small="true" />}
      {isLogged && (
        <Link to="/profile">
          <div className={style.userCard}>
            <span className={style.userName}>{username}</span>
            <img className={style.userImage} src={image} alt="userPhoto" />
          </div>
        </Link>
      )}
      {isLogged && (
        <button type="button" onClick={userLogOut}>
          <LogButton to="/" text="Log Out" border="true" />
        </button>
      )}
    </header>
  );
}

const mapStateToProps = (state) => ({
  data: state.loginReducer,
});

export default connect(mapStateToProps, actions)(Header);
