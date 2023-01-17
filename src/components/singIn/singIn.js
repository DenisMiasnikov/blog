/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import SubmitButton from '../submitButton';
import FormFooter from '../formFooter';
import FormInput from '../formInput';
import Loading from '../loading';
import routs from '../../routs/routs';
import * as actions from '../../actions/loginActions';

import style from './singIn.module.scss';

function SingIn({ data, asyncUserSingIn, startToFetch, loading }) {
  const { isLogged } = data;

  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || null;

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
    startToFetch();
    asyncUserSingIn(e.email, e.password, setError, () => navigate(fromPage, { replace: true }));
    reset();
  };

  useEffect(() => {
    if (isLogged && fromPage) {
      navigate(fromPage);
    } else if (isLogged && !fromPage) {
      navigate(-1);
    }
  }, [fromPage, isLogged, navigate]);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
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
            <SubmitButton text="Login" />
            <FormFooter text="Don’t have an account?" link={routs.singUp} linkText="Sing Up" />
          </form>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.loginReducer,
  loading: state.articlesReducer.loading,
});

export default connect(mapStateToProps, actions)(SingIn);
