/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import SubmitButton from '../submitButton';
import FormFooter from '../formFooter';
import FormInput from '../formInput';
import InputError from '../inputError';
import * as actions from '../../actions/loginActions';

import style from './singIn.module.scss';

function SingIn({ data, asyncUserSingIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/sing-up';
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (e) => {
    asyncUserSingIn(e.email, e.password, setError, () => navigate(fromPage, { replace: true }));
    reset();
    console.log(fromPage);
    navigate(fromPage);
  };
  const error = errors['email or password'] ? <InputError message={errors['email or password'].message} /> : null;
  return (
    <div className={style.wrapper}>
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

// export default function SingIn() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const fromPage = location.state?.from?.pathname || '/sing-up';

//   return (
//     <div>
//       <h1>from page</h1>
//       {fromPage}
//     </div>
//   );
// }
