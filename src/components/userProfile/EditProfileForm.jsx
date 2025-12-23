import React, { useState } from "react";
import { useToast } from "../../provider/ToastProvider";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import { useParams } from "react-router";
import { photoUploadToCloudinary } from "../../utils/imgUploadToCloudinary";

export default function EditProfileForm({ user, onClose, editValue }) {
  const [name, setName] = useState(user?.name || "");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  const { setUser } = useAuth();
  const { userId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      if (profileImage) {
        imageUrl = await photoUploadToCloudinary(profileImage);
      }

      const payload = {
        name,
        bio,
      };
      if (imageUrl) {
        payload.profileImage = imageUrl;
      }
      if (editValue === "password") {
        payload.oldPassword = oldPassword;
        payload.password = password;
      }

      const res = await axiosSecure.patch(`/users/profile/${userId}`, payload);
      setUser({ ...user, ...res.data.data });
      success(editValue === "profile" ? "Profile updated" : "Password changed");
      onClose?.();
    } catch (err) {
      error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-3">
        {editValue === "profile" && (
          <div>
            <label className="text-sm">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        )}
        {user.provider !== "google" && editValue === "password" && (
          <>
            <div>
              <label className="text-sm">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="text-sm">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </>
        )}

        {editValue === "profile" && (
          <>
            {" "}
            <div>
              <label className="text-sm">Profile Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
              )}
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
          </>
        )}
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
    </div>
  );
}
