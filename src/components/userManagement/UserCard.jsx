import React from "react";
import { FaCheckCircle, FaTimesCircle, FaGoogle, FaEnvelope, FaUserShield, FaUserTie, FaUser, FaTrash, FaEdit } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";

export default function UserCard({ user, onEdit, onDelete }) {
  const {theme}=useTheme()
  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaUserShield className="text-blue-500" />;
      case "creator":
        return <FaUserTie className="text-green-500" />;
      case "user":
        return <FaUser className="text-gray-500" />;
      default:
        return <FaUser />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "creator":
        return "bg-green-100 text-green-800";
      case "user":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <tr key={user._id} className={` ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {user.profileImage ? (
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user.profileImage}
                  alt={user.name}
                />
              ) :user.name.charAt(0).toUpperCase()}
             
            </div>
          </div>
          <div className="ml-4">
            <div className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {user.name}
            </div>
            <div className="text-sm text-gray-500">
              {user._id}
            </div>
          </div>
        </div>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
            user.role
          )}`}
        >
          {getRoleIcon(user.role)}
          <span className="ml-1">
            {user.role.charAt(0).toUpperCase() +
              user.role.slice(1)}
          </span>
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.isVerified 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {user.isVerified ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
          {user.isVerified ? 'Verified' : 'Not Verified'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {user.provider === 'google' ? <FaGoogle className="mr-1" /> : <FaEnvelope className="mr-1" />}
          {user.provider || 'email'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {user.emailVerifyCode || 'N/A'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
        <button
          onClick={() => onEdit(user)}
          className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
        >
          <FaEdit />
          Update
        </button>
        {user.role !== "admin" && (
          <button
            onClick={() => onDelete(user)}
            className="text-red-600 hover:text-red-900 flex items-center gap-1"
          >
            <FaTrash />
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}
