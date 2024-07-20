import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hideModalTimeout, setHideModalTimeout] = useState(null);

  const navigate = useNavigate();

  const resetInputFields = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      if (response && response.data) {
        const { token, role } = response.data;

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('currentLoggedInUserEmail', email);
          localStorage.setItem('userRole', role);

          setShowSuccessModal(true);
          const timeoutId = setTimeout(() => {
            setShowSuccessModal(false);
            navigate("/Overview");
            setHideModalTimeout(timeoutId);
          }, 2000);
        } else {
          setErrorMessage('Login failed. Token not received.');
          resetInputFields();
        }
      } else {
        setErrorMessage("Network error, couldn't login user");
        resetInputFields();
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setErrorMessage('Incorrect email or password. Please try again.');
        resetInputFields();
      } else {
        console.error('Server error. Please try again later.');
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

  const handleForgotPassword = () => {
    navigate('/Forgot-password');
  };

  const handleUserRegistration = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-stretch md:flex-row min-h-screen bg-blue-500 p-5">
      <form className="basis-1/2 self-center md:p-12 justify-center items-center gap-20" onSubmit={handleSubmit}>
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-500 text-white p-4 rounded">User logged in successfully</div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            <strong>{errorMessage}</strong>
            <button type="button" className="ml-4" onClick={() => setErrorMessage('')}>×</button>
          </div>
        )}

        <div className="flex flex-col items-center mt-8">
          <img src="../public/auca.jpg" alt="AUCA Logo" className="rounded-full w-32 h-32 mb-8" />
          <div className="w-full flex flex-col gap-4">
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
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleUserRegistration}>Register</button>
        </div>
        <button type="button" className="mt-10 text-white" onClick={handleForgotPassword}>Forgot password</button>
      </form>
      <div className="basis-1/2 hidden md:flex justify-center items-center bg-cover" style={{ backgroundImage: 'url(../public/Running.png)' }}></div>
    </div>
  );
};

export default SignIn;
