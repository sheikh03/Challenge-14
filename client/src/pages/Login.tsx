import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { authenticate } from "../api/authAPI";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await authenticate(credentials);
      Auth.login(result.token);
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid username or password');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleFormSubmit}>
        <h1>Sign In</h1>
        <label>Username</label>
        <input
          type='text'
          name='username'
          value={credentials.username || ''}
          onChange={handleInputChange}
          placeholder='Enter username'
          required
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={credentials.password || ''}
          onChange={handleInputChange}
          placeholder='Enter password'
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
};

export default Login;