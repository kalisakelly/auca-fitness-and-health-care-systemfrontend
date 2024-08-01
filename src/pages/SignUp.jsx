import { useState, useEffect } from 'react';
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hideModalTimeout, setHideModalTimeout] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const resetInputFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/signup', {
        username,
        email,
        password,
      });
      if (response) {
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('currentLoggedInUserEmail', email);
        setShowSuccessModal(true);
        const timeoutId = setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/otp-verification");
          setHideModalTimeout(null); // Clear timeout ID
        }, 2000);
        setHideModalTimeout(timeoutId);
      } else {
        setErrorMessage("Network error, couldn't sign up user");
        resetInputFields();
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setErrorMessage('Incorrect input. Please try again.');
        resetInputFields();
      } else {
        setErrorMessage('Server error. Please try again later.');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (hideModalTimeout) {
        clearTimeout(hideModalTimeout);
      }
    };
  }, [hideModalTimeout]);

  const handleUserRegistration = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-stretch md:flex-row min-h-screen bg-blue-500 p-5">
      <form onSubmit={handleSubmit} className=" basis-1/2 self-center md:p-12 justify-center items-center gap-20">
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-500 text-white p-4 rounded">User registered successfully</div>
          </div>
        )}
        <div className="flex flex-col items-center mt-8">
          <img src="/auca.jpg" alt="AUCA Logo" className="rounded-full w-32 h-32 mb-8" />
          <div className="w-full flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block text-white">Username</label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white">Password</label>
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i onClick={togglePasswordVisibility}>
                {passwordShown ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </i>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-white">Confirm Password</label>
              <input
                type={passwordShown ? "text" : "password"}
                id="confirmPassword"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleUserRegistration}>Register</button>
        </div>
      </form>
      <div className="basis-1/2 hidden md:flex justify-center items-center bg-cover" style={{ backgroundImage: 'url(/Running.png)' }}></div>
    </div>
  );
}

export default SignUp;
