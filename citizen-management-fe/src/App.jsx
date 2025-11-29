import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  // Clear form data and storage on component mount (khi quay lại trang login)
  useEffect(() => {
    // Clear từ localStorage/sessionStorage nếu có lưu
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    sessionStorage.clear();
  }, []);

  const handleGoogle = () => {
    // ví dụ: redirect đến OAuth (thay URL bằng thực tế)
    console.log("Continue with Google");
    window.location.href = "/auth/google"; // thay bằng route / endpoint thực tế
  };

  const handleMicrosoft = () => {
    console.log("Continue with Twitter");
    window.location.href = "/auth/twitter";
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Sign in", { email, password, keepSignedIn });
    // Redirect to household detail page regardless of input
    navigate("/household-detail");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log("Reset password for", email);
    // TODO: mở modal hoặc chuyển sang page reset password
    alert("Reset password: sẽ gửi link đến email nếu email hợp lệ.");
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log("Create account");
    // TODO: redirect tới trang đăng ký
    window.location.href = "/register";
  };

  const togglePasswordVisibility = () => {
    setShowPassword((s) => !s);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Local Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100 pointer-events-none"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ zIndex: 1 }}
      ></video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-amber-50/5 z-10"></div>

      {/* Login Form Container */}
      <div className="w-full max-w-5xl h-auto grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl relative z-20">
        {/* LEFT SIDE */}
        <div className="bg-linear-to-br bg-blue-500/30 p-10 flex flex-col justify-center text-white">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-5 rounded-full">
              <img
                src="/images/house.png"
                className="h-20 w-20"
                alt="House icon"
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-center">
            Quản lý dân cư
          </h1>

          <p className="text-center text-white/90 text-lg">
            Tổ dân phố 7, phường La Khê
          </p>

          <div className="flex justify-center mt-8 space-x-2 opacity-70">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-gray-800 p-10 text-white overflow-y-auto max-h-screen">
          <h2 className="text-3xl font-semibold mb-2">Sign in</h2>
          <p className="text-gray-400 mb-6">Access your secure account</p>

          {/* Social buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogle}
              className="w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex items-center justify-center gap-3"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-6"
                alt=""
              />
              <span>Continue with Google</span>
            </button>

            <button
              onClick={handleMicrosoft}
              className="w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex items-center justify-center gap-3"
            >
              <img
                src="https://www.svgrepo.com/show/452062/microsoft.svg"
                className="w-6 invert"
                alt=""
              />
              <span>Continue with Microsoft</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 px-4">Or sign in with email</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSignIn}>
            {/* EMAIL */}
            <label className="block mb-2 text-gray-300">Email address</label>
            <div className="flex items-center bg-gray-700 p-3 rounded-lg mb-4">
              <span className="mr-3 opacity-75">@</span>
              <input
                className="bg-transparent outline-none w-full"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <label className="block mb-2 text-gray-300">Password</label>
            <div className="flex items-center bg-gray-700 p-3 rounded-lg mb-4">
              <input
                className="bg-transparent outline-none w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-2 opacity-75"
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                />
                <span className="text-gray-300">Keep me signed in</span>
              </label>
              <a
                href="#"
                onClick={handleResetPassword}
                className="text-blue-400 hover:underline"
              >
                Reset password
              </a>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
              type="submit"
            >
              Sign in to your account
            </button>
          </form>

          <p className="mt-6 text-gray-300 text-center">
            New to our platform?{" "}
            <a
              href="#"
              onClick={handleCreateAccount}
              className="text-blue-400 hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
