import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loder from '../assets/gifloader.gif';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.post('https://login-api-tan.vercel.app/user/login', {
      userName: username,
      password: password,
    })
      .then(res => {
        setLoading(false);
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.userName);
        navigate('/dashboard');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.response.data.msg);
      });
  }

  const signup = () => {
    navigate('/');
  } 

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <img style={{ width: '150px' }} src={loder} alt="Loading" />
        </div>
      )}

      {!loading && (
        <div className="flex items-center justify-center min-h-screen px-4 bg-[#25282c]">
          <div className="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200 w-full max-w-md">
            <div className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col">
              <h1 className="text-white text-2xl">Login</h1>
              <form onSubmit={submitHandler} className="w-full">
                <input
                  className="w-full mt-2 p-2 bg-[#E8F0FE] rounded-md border outline-none border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  placeholder='username' required onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  
                  id=""
                />
                <br />
                <input
                  className="w-full mt-2 p-2 bg-[#E8F0FE] outline-none rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  type="password" placeholder='password' required onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id=""
                />
                <br />
                <input
                  className="w-full mt-2 p-2 bg-blue-900 rounded-full font-bold text-white border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                  type="submit"
                  id=""
                />
              </form>
              <p>
                Don't have an account?
                <span
                  className="font-semibold text-white hover:text-blue-500 transition-all duration-200 cursor-pointer"
                  onClick={signup}
                > sign up</span>
              </p>
            </div>
          </div>
        </div>
      )}
      {hasError && (
        <div className="flex items-center justify-center mt-4 bg-black">
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      )}
    </>
  );
}

export default Login;
