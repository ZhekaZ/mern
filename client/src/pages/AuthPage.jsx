import React, { useEffect, useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/Auth.context';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      console.log(data);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className='row'>
      <div className='col s8 offset-s2'>
        <h1>Auth</h1>
        <div className='card indigo darken-5'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorization</span>
            <div className='input-field'>
              <input
                placeholder='Enter email'
                onChange={changeHandler}
                id='email'
                type='text'
                value={form.email}
                name='email'
              />
              <label htmlFor='email'>Email</label>
            </div>
            <div className='input-field'>
              <input
                placeholder='Enter password'
                id='password'
                type='password'
                name='password'
                value={form.password}
                onChange={changeHandler}
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn waves-effect waves-light yellow darken-4'
              onClick={loginHandler}
              style={{ marginRight: '1rem' }}
              disabled={loading}>
              Sign In
            </button>
            <button
              className='btn waves-effect waves-light grey lighten-1 black-text'
              onClick={registerHandler}
              disabled={loading}>
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
