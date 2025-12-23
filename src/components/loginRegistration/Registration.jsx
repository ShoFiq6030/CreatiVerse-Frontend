import React, { useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import { photoUploadToCloudinary } from "../../utils/imgUploadToCloudinary";
import Loading from "../common/Loading";
import { Link, useNavigate } from "react-router";
import { useToast } from "../../provider/ToastProvider";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const { success, error: showError } = useToast();
  const { setUser, googleSignin } = useAuth();
  const [socialLoading, setSocialLoading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const validate = () => {
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRe.test(email)) return "Enter a valid email";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (file && file.size > 2 * 1024 * 1024)
      return "Image must be smaller than 2MB";
    return null;
  };

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
      let profileImage = null;
      if (file) {
        const url = await photoUploadToCloudinary(file);
        if (!url) throw new Error("Invalid image file");
        profileImage = url;
      }
      let payload;

      if (!file)
        payload = {
          name,
          email,
          password,
          role: isCreator ? "creator" : "user",
        };
      else
        payload = {
          name,
          email,
          password,
          profileImage,
          role: isCreator ? "creator" : "user",
        };

      const res = await axiosSecure.post("/auth/register", payload);
      if (res?.data?.success) {
        success("Registration successful — check your email for the code");
        // navigate("/verify-email", { state: { email } });
        navigate("/login");
      } else {
        setError(res?.data?.message || "Registration failed");
        showError(res?.data?.message || "Registration failed");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Error";
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };
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

  return (
    <div className="container mx-auto p-6 h-screen flex justify-center items-center">
      <div className="w-120 mx-auto card bg-base-100 shadow-lg  border-2 p-6">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
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
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-start gap-4"
        >
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="input input-bordered"
          />
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
          <div className="flex gap-2 items-center">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Profile Image (optional)
              </legend>
              <input
                type="file"
                accept="image/*"
                className="file-input"
                onChange={handleFile}
              />
              <label className="label">Max size 2MB</label>
            </fieldset>
            {preview && (
              <img src={preview} alt="preview" className="w-24 h-24 rounded" />
            )}
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={isCreator}
                onChange={(e) => setIsCreator(e.target.checked)}
              />
              <span className="">Sign up as creator</span>
            </label>
          </div>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>

          {error && <p className="text-red-500">{error}</p>}

          <button className="btn bg-sky-400" type="submit" disabled={loading}>
            {loading ? <Loading /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
