import React, { useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import Loading from "../common/Loading";
import { useNavigate } from "react-router";
import { useToast } from "../../provider/ToastProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { success, error: showError } = useToast();

  const validate = () => {
    const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRe.test(email)) return "Enter a valid email";
    if (!password) return "Enter your password";
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
      const res = await axiosSecure.post("/auth/login", { email, password });
      if (res?.data?.success) {
        success("Logged in successfully");
        navigate("/");
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
    <div className="container mx-auto lg:h-screen flex justify-center items-center p-6">
      <div className="w-100 mx-auto card bg-base-100 shadow-md border p-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start gap-4">
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
