import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loder from '../assets/gifloader.gif';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.post('https://login-api-tan.vercel.app/user/signup', {
      userName: username,
      password: password,
      email: email,
      phone: phone
    })
      .then(res => {
        setLoading(false);
        console.log(res);
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.message);
      });
  }

  const login = () => {
    navigate('/login');
  } 

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center min-h-screen  bg-[#25282c]">
          <img style={{ width: '150px' }} src={loder} alt="Loading" />
        </div>
      )}

      {!loading && (
        <div className="flex items-center justify-center min-h-screen px-4  bg-[#25282c]">
          <div className="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200 w-full max-w-md">
            <div className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col">
              <h1 className="text-white text-2xl">Create account</h1>
              <form onSubmit={submitHandler} className="w-full">
                <input
                  className="w-full mt-2 p-2 bg-[#E8F0FE] rounded-md border outline-none border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  placeholder='username' required onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
                <br />
                <input
                  className="w-full mt-2 p-2 bg-[#E8F0FE] rounded-md border outline-none border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  type="password" placeholder='password' required onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <input
                  className="w-full mt-2 p-2 bg-[#E8F0FE] rounded-md border outline-none border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  type="email" placeholder='email' required onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  className="w-full mt-2 p-2 bg-[#E8F0FE] outline-none rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  type="number" placeholder='phone' required onChange={(e) => setPhone(e.target.value)}
                />
                <br />
                <input
                  className="w-full mt-2 p-2 bg-blue-900 rounded-full font-bold text-white border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                  type="submit"
                />
              </form>
              <p>
                I have an account
                <span
                  className="font-semibold text-white hover:text-blue-500 transition-all duration-200 cursor-pointer"
                  onClick={login}
                > Log in</span>
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

export default Signup;
