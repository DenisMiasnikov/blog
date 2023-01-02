/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import SubmitButton from '../submitButton';
import FormFooter from '../formFooter';
import FormInput from '../formInput';
import * as actions from '../../actions/loginActions';

import style from './singUp.module.scss';

function SingUp({ data, asyncMakeUser }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const { isLogged } = data;
  const onSubmit = (e) => {
    const userData = {
      email: e.email,
      password: e.password,
      username: e.username,
    };
    // e.preventDefault();
    asyncMakeUser(userData, setError);
  };
  return (
    <div className={style.wrapper}>
      {isLogged && <Navigate to="/article" />}
      <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={style.title}>Create new account</h3>
        <FormInput
          title="Username"
          placeholder="Username"
          name="username"
          errors={errors.username}
          reg={register('username', {
            required: "Username field can't be empty",
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters long',
            },
            maxLength: {
              value: 20,
              message: 'Username can be maximum 20 characters long',
            },
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
        <FormInput title="Repeat Password" placeholder="Password" type="password" />
        <div className={style.agreementForm}>
          <input
            className={style.agreementCheckbox}
            id="agreement"
            type="checkbox"
            name="agreement"
            value="agreement"
          />
          <label className={style.agreementLabel} htmlFor="agreement">
            I agree to the processing of my personal information
          </label>
        </div>
        <SubmitButton text="Create" />
        <FormFooter text="Already have an account?" link="/sing-in" linkText="Sing in" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.loginReducer,
});

export default connect(mapStateToProps, actions)(SingUp);