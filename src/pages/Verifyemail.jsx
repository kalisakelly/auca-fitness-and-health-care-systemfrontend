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
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue-500 flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl font-bold mb-4">OTP VERIFICATION</h1>
        <p className="text-lg mb-8">Verify With OTP</p>
        <p className="mb-4">Enter the OTP sent to +250-82******00</p>
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
      <div className="w-1/2 flex justify-center items-center bg-blue-500">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded-lg">Change</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
