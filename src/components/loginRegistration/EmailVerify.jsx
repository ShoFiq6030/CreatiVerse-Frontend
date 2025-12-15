import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axiosSecure from "../../api/axiosSecure";
import Loading from "../common/Loading";
import { useToast } from "../../provider/ToastProvider";

export default function EmailVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || "";

  const [email, setEmail] = useState(emailFromState);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { success, error: showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!/^[0-9]{6}$/.test(code)) {
      setError("Enter a 6 digit code");
      showError("Enter a 6 digit code");
      return;
    }
    setLoading(true);
    console.log(email, code);
    try {
      const res = await axiosSecure.post(`/auth/verify-email/${email}`, {
        verifyCode: Number(code),
      });
      if (res?.data?.success) {
        success("Email verified — you can login now");
        navigate("/login");
      } else {
        setError(res?.data?.message || "Verification failed");
        showError(res?.data?.message || "Verification failed");
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
      <div className="max-w-md mx-auto card bg-base-100  border-2 shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6-digit code"
            maxLength={6}
            className="input input-bordered"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button className="btn bg-sky-400" type="submit" disabled={loading}>
            {loading ? <Loading /> : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
