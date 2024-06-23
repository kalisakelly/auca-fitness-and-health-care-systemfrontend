import { useRef, useState } from "react";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      inputRefs.current[index - 1].focus();
      setOtp(newOtp);
    }
  };

  const handleSubmit = async () => {
    const token = otp.join("");
    try {
      const response = await fetch("http://localhost:3001/auth/verify-email?token=" + token, {
        method: "POST",
      });
      const result = await response.json();
      if (result.success) {
        setRedirect(true);
      } else {
        setError("Invalid or expired OTP");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (redirect) {
    window.location.href = "/login";
  }

  return (
    <div className="flex h-screen  bg-blue-500">
      <div className="w-1/2 flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl font-bold mb-4">OTP VERIFICATION</h1>
        <p className="text-lg mb-8">Verify With OTP</p>
        <p className="mb-4">Enter the OTP received on your email</p>
        <div className="flex space-x-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              className="w-16 h-16 bg-white text-blue-500 text-4xl flex justify-center items-center rounded-lg"
              type="text"
              maxLength={1}
              value={digit}
              autoFocus={index === 0}
              ref={(ref) => (inputRefs.current[index] = ref)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={handleSubmit} className="bg-black text-white px-6 py-3 rounded-lg mb-4">Verify with OTP</button>
        <p className="text-red-500">Resend OTP in: <span className="text-red-700">00:30</span></p>
      </div>
      <div className="w-1/2 flex  md:flex bg-cover" style={{ backgroundImage: 'url(src/assets/password2.png)' }}>

    </div>
    </div>
  );
};

export default Otp;
