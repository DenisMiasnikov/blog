/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import SubmitButton from '../submitButton';
import FormInput from '../formInput';
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
  const { isLogged, error } = data;
  // setError('username', {
  //   type: 'custom',
  //   message: 'custom message',
  // });

  const token = localStorage.getItem('token');
  const onSubmit = (e) => {
    const userData = {
      email: e.email,
      password: e.password,
      username: e.username,
      image: e.image,
    };
    asyncUpdateUser(token, userData, setError);
  };
  return (
    <div className={style.wrapper}>
      {/* {!isLogged && <Navigate to="/sing-in" />} */}
      <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={style.title}>Edit Profile</h3>
        <FormInput
          title="Username"
          placeholder="Username"
          name="username"
          errors={errors.username}
          reg={register('username', {
            required: "Username field can't be empty",
          })}
        />
        <FormInput
          title="Email address"
          placeholder="Email address"
          name="email"
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
            required: "Password field can't be empty",
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
