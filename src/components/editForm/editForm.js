/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import SubmitButton from '../submitButton';
import BlogUserService from '../../services/blog-services';
import FormInput from '../formInput';
import routs from '../../routs/routs';
import * as actions from '../../actions/loginActions';

import style from './editForm.module.scss';

function EditForm({ data, asyncUpdateUser }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const { isLogged, user, error } = data;
  const { username, email, image } = user;
  const userService = new BlogUserService();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const onSubmit = (e) => {
    const userData = {
      email: e.email,
      password: e.password,
      username: e.username,
      image: e.image,
    };
    userService.updateUser(token, userData, setError).then(() => {
      asyncUpdateUser(token, userData, setError);
      navigate(routs.articles);
    });
  };
  return (
    <div className={style.wrapper}>
      <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={style.title}>Edit Profile</h3>
        <FormInput
          title="Username"
          placeholder="Username"
          name="username"
          value={username}
          errors={errors.username}
          reg={register('username', {
            required: "Username field can't be empty",
          })}
        />
        <FormInput
          title="Email address"
          placeholder="Email address"
          name="email"
          value={email}
          errors={errors.email}
          reg={register('email', {
            required: "Email field can't be empty",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email pattern',
            },
          })}
        />
        <FormInput
          title="Password"
          placeholder="Password"
          name="password"
          errors={errors.password}
          reg={register('password', {
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
            maxLength: {
              value: 40,
              message: 'Password can be maximum 40 characters long',
            },
          })}
        />
        <FormInput
          title="Avatar image (url)"
          placeholder="Avatar image"
          name="image"
          value={image}
          errors={errors.avatar}
          reg={register('image', {
            pattern: {
              value: /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/,
              message: 'Must be correct url link',
            },
          })}
        />
        <SubmitButton text="Save" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.loginReducer,
});

export default connect(mapStateToProps, actions)(EditForm);
