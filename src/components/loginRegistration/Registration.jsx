import React, { useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import { photoUploadToCloudinary } from "../../utils/imgUploadToCloudinary";
import Loading from "../common/Loading";
import { useNavigate } from "react-router";
import { useToast } from "../../provider/ToastProvider";

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

  const { success, error: showError } = useToast();

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
      let profileImage = "";
      if (file) {
        const url = await photoUploadToCloudinary(file);
        if (!url) throw new Error("Invalid image file");
        profileImage = url;
      }

      const payload = {
        name,
        email,
        password,
        profileImage,
        role: isCreator ? "creator" : "user",
      };
      const res = await axiosSecure.post("/auth/register", payload);
      if (res?.data?.success) {
        success("Registration successful — check your email for the code");
        navigate("/verify-email", { state: { email } });
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

  return (
    <div className="container mx-auto p-6 lg:h-screen flex justify-center items-center">
      <div className="w-120 mx-auto card bg-base-100 shadow-lg  border-2 p-6">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
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

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={isCreator}
              onChange={(e) => setIsCreator(e.target.checked)}
            />
            <span className="">Sign up as creator</span>
          </label>

          {error && <p className="text-red-500">{error}</p>}

          <button className="btn bg-sky-400" type="submit" disabled={loading}>
            {loading ? <Loading /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
