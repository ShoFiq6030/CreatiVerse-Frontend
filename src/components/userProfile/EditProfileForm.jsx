import React, { useState } from "react";
import { useToast } from "../../provider/ToastProvider";
import useAuth from "../../hooks/useAuth";

export default function EditProfileForm({ user, onClose }) {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      // If you have an API endpoint, uncomment and use the following:
      // const payload = { name, bio };
      // const res = await axiosSecure.put('/user/profile', payload);
      // setUser({ ...user, ...res.data.user });

      // Fallback: update local user state
      setUser({ ...user, name, bio });
      success("Profile updated");
      onClose?.();
    } catch {
      error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-sm">Full name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="text-sm">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="textarea textarea-bordered w-full"
          rows={4}
        />
      </div>
      <div className="flex gap-2">
        <button
          className="btn bg-indigo-600 text-white"
          type="submit"
          disabled={loading}
        >
          Save
        </button>
        <button
          className="btn"
          type="button"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
