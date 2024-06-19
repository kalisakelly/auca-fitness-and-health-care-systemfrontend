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
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hideModalTimeout, setHideModalTimeout] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const resetInputFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          navigate("/login");
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
      <div className='grid grid-cols-2  items-stretch md:flex-row min-h-screen bg-blue-300 p-5 '>
        <form onSubmit={handleSubmit} className=" self-center md:p-12 justify-center items-center gap-10">
          <div className="mb-6">
            <label htmlFor="username">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-black"
              >
                Username
              </Typography>
            </label>
            <Input
              id="username"
              color="gray"
              size="lg"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="w-64 placeholder:opacity-100 focus:border-t-primary border-black"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-black"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <i onClick={togglePasswordVisibility}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <Button color="gray" size="lg" className="mt-6" fullWidth type="submit">
            Sign Up
          </Button>
          <div className="!mt-4 flex justify-end">
          </div>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            Sign Up with Google
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Registered?{" "}
            <a href="#" className="font-medium text-gray-900" onClick={handleUserRegistration}>
              Login
            </a>
          </Typography>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </form>
        <div className="hidden md:flex bg-cover" style={{ backgroundImage: 'url(src/assets/password2.png)' }}>
        </div>
        
      </div>
  );
}

export default SignUp;
