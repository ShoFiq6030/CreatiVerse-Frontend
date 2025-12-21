import React, { useState } from "react";
import {
  FaImage,
  FaCheckCircle,
  FaTimesCircle,
  FaGoogle,
  FaEnvelope,
} from "react-icons/fa";
import { photoUploadToCloudinary } from "../../utils/imgUploadToCloudinary";
import Loading from "../common/Loading";

export default function UpdateUserModal({
  editingUser,
  setEditingUser,
  updateUserMutation,
  theme,
  setOpenModal,
}) {
  const [newProfileImg, setNewProfileImg] = useState(null);
  console.log(editingUser);
  const [isLoading, setIsLoading] = useState(false);

  const confirmUpdateUser = async () => {
    if (!editingUser) return;

    try {
      // Upload profile image if changed
      setIsLoading(true);
      let profileImage = editingUser.profileImage;
      if (newProfileImg) {
        profileImage = await photoUploadToCloudinary(newProfileImg);
        // console.log(profileImage);
      }
      const updatedUser = { ...editingUser, profileImage };

      //   const updateData = {
      //     name: editingUser.newName || editingUser.name,
      //     isVerified: editingUser.newIsVerified,
      //     emailVerifyCode: editingUser.newEmailVerifyCode,
      //     profileImage: profileImage,
      //     role: newRole,
      //   };
      // console.log(editingUser);
      updateUserMutation.mutate({ ...updatedUser });
      setEditingUser(updatedUser);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
        } rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
      >
        <h3 className="text-lg font-semibold mb-4">
          Update User: {editingUser.name}
        </h3>
        <div className="space-y-4">
          {/* Profile Image Section */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Profile Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  src={
                    newProfileImg
                      ? URL.createObjectURL(newProfileImg)
                      : editingUser.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          editingUser.name
                        )}`
                  }
                  alt="Profile Preview"
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <label
                  className={`flex items-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 ${
                    theme === "dark"
                      ? "border-gray-600 hover:bg-gray-700"
                      : "border-gray-300"
                  }`}
                >
                  <FaImage className="mr-2" />
                  <span>Choose Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setNewProfileImg(file);
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              value={editingUser.name || ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Email Verification Status */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Verified
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isVerified"
                  checked={editingUser.isVerified === true}
                  onChange={() =>
                    setEditingUser({ ...editingUser, isVerified: true })
                  }
                  className="mr-2"
                />
                <span
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Verified
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isVerified"
                  checked={editingUser.isVerified === false}
                  onChange={() =>
                    setEditingUser({ ...editingUser, isVerified: false })
                  }
                  className="mr-2"
                />
                <span
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Not Verified
                </span>
              </label>
            </div>
          </div>

          {/* Email Verification Code */}
          {/* {editingUser.provider === "local" && (
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Verification Code
              </label>
              <input
                type="text"
                value={editingUser.emailVerifyCode || ""}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    emailVerifyCode: e.target.value,
                  })
                }
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                disabled={
                  editingUser.isVerified || editingUser.provider === "google"
                }
              />
            </div>
          )} */}

          {/* Role Selection */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Role
            </label>
            <select
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="">Select a role...</option>
              <option value="user">User</option>
              <option value="creator">Creator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Provider Information */}
          {/* <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Provider
            </label>
            <input
              type="text"
              value={editingUser.provider || "local"}
              disabled
              className={`w-full px-3 py-2 border rounded-md ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              }`}
            />
          </div> */}

          <div className="flex gap-3 pt-4">
            <button
              onClick={confirmUpdateUser}
              disabled={updateUserMutation.isPending || isLoading}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateUserMutation.isPending || isLoading ? (
                <Loading />
              ) : (
                "Update User"
              )}
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className={`flex-1 py-2 px-4 rounded-md hover:bg-gray-400 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
