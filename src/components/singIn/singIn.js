/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import SubmitButton from '../submitButton';
import FormFooter from '../formFooter';
import FormInput from '../formInput';
import InputError from '../inputError';
import * as actions from '../../actions/loginActions';

import style from './singIn.module.scss';

function SingIn({ data, asyncUserSingIn }) {
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
    asyncUserSingIn(e.email, e['email or password'], setError);
    reset();
  };
  const error = errors['email or password'] ? <InputError message={errors['email or password'].message} /> : null;
  console.log(errors['email or password']);
  return (
    <div className={style.wrapper}>
      {isLogged && <Navigate to="/article" />}
      <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={style.title}>Sing In</h3>
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
          reg={register('password', { required: "Password field can't be empty" })}
        />
        {error}
        <SubmitButton text="Login" />
        <FormFooter text="Don’t have an account?" link="/sing-up" linkText="Sing Up" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.loginReducer,
});

export default connect(mapStateToProps, actions)(SingIn);
