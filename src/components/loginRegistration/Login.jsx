import React, { useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import Loading from "../common/Loading";
import { useLocation, useNavigate } from "react-router";
import { useToast } from "../../provider/ToastProvider";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { success, error: showError } = useToast();
  const { login, googleSignin, setUser } = useAuth();
  const [socialLoading, setSocialLoading] = useState(false);
  const destination = location.state?.from?.pathname || "/";

  const handleGoogleSignin = async () => {
    setSocialLoading(true);
    setError(null);
    try {
      const result = await googleSignin();
      const user = result.user;

      // console.log(user);
      // Get Firebase-issued ID token (verified JWT from Google)
      const idToken = await user.getIdToken();
      // console.log(idToken);

      // Send it to your backend for verification + DB entry
      const res = await axiosSecure.post(`/auth/google-login`, {
        firebaseToken: idToken,
      });

      // Backend returns your app's token and user data
      // merge accessToken into the user object so AuthContext persists it
      setUser(res?.data?.user);
      const token = res?.data?.accessToken;
      localStorage.setItem("token", token);
      success("google login successful ");
      navigate(location.state || "/");
      // console.log("Google login successful:", res.data);
    } catch (err) {
      console.error("Google login error:", err);
      const msg =
        err?.response?.data?.message || err?.message || "Google login failed!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRe.test(email)) return "Enter a valid email";
    if (!password) return "Enter your password";
    return null;
  };
  // console.log(location);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      showError(v);
      return;
    }
    setLoading(true);
    try {
      const res = await axiosSecure.post("/auth/login", { email, password });
      console.log(res);
      if (res?.data?.success) {
        success("Logged in successfully");
        const userData = res?.data?.data?.user;
        const token = res?.data?.data?.accessToken;
        // console.log(userData, token);
        login(userData, token);

        navigate(destination);
      } else {
        setError(res?.data?.message || "Login failed");
        showError(res?.data?.message || "Login failed");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Error";
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto h-screen flex justify-center items-center p-6">
      <div className="w-100 mx-auto card bg-base-100 shadow-md border p-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="flex flex-col gap-4 my-5">
          {/* Google */}
          <button
            className="btn bg-white text-black border-[#e5e5e5]"
            onClick={handleGoogleSignin}
            disabled={socialLoading}
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          {/* Facebook */}
          {/* <button
            className="btn bg-[#1A77F2] text-white border-[#005fd8]"
            onClick={() => handleSocialLogin("facebook")}
            disabled={socialLoading}
          >
            <svg
              aria-label="Facebook logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path
                fill="white"
                d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
              ></path>
            </svg>
            Login with Facebook
          </button> */}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-start gap-4"
        >
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="input input-bordered"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="input input-bordered"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button className="btn bg-sky-400" type="submit" disabled={loading}>
            {loading ? <Loading /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
