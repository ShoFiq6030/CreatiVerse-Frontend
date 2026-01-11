import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import Loading from "../components/common/Loading";
import ConfirmModal from "../components/common/ConfirmModal";
import UserCard from "../components/userManagement/UserCard";
import UpdateUserModal from "../components/userManagement/UpdateUserModal";
import {
  FaUser,
  FaUserShield,
  FaUserTie,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaTimesCircle,
  FaGoogle,
  FaCheckCircle,
  FaEnvelope,
} from "react-icons/fa";
import { useToast } from "../provider/ToastProvider";
import AdminUserSideBar from "./../components/userProfile/AdminUserSideBar";

export default function ManageUsers() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Sorting state
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const { success, error } = useToast();

  // Fetch all users
  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/all-users");
      return res.data.data;
    },
  });
  // console.log(usersData);

  // Update user role mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ ...updateData }) => {
      const res = await axiosSecure.patch(
        `/users/profile/${updateData._id}`,
        updateData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      setEditingUser({});
      success("User updated successfully");
      setOpenModal(false);
    },
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.delete(`/users/delete-user/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      setShowDeleteModal(false);
      setUserToDelete(null);
      success("User deleted successfully");
    },
    onError: (err) => {
      console.error("Error deleting user:", err);
      error("Failed to delete user");
    },
  });

  // Filter and search users
  const filteredUsers =
    usersData?.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    }) || [];

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue, bValue;

    switch (sortField) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "email":
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
        break;
      case "role":
        aValue = a.role.toLowerCase();
        bValue = b.role.toLowerCase();
        break;
      case "joined":
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const roleCounts = {
    admin: usersData?.filter((u) => u.role === "admin").length || 0,
    creator: usersData?.filter((u) => u.role === "creator").length || 0,
    user: usersData?.filter((u) => u.role === "user").length || 0,
  };

  if (isLoading) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-10 text-red-500">
        Error loading users data
      </div>
    );
  }
  // Check if user is admin
  if (user.role !== "admin") {
    return (
      <div className="container mx-auto px-6 py-10 text-red-500">
        Access Denied. You do not have permission to view this page.
      </div>
    );
  }

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleUpdateUser = (user) => {
    setOpenModal(true);
    setEditingUser(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete._id);
    }
  };
  // console.log(usersData);

  return (
    <div
      className={`container m-20  mx-auto px-6 py-10 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p
          className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
        >
          Manage users, roles, and permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className=" md:flex ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:w-2/3">
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Users
                </p>
                <p className="text-2xl font-bold">{usersData?.length}</p>
              </div>
              <FaUser
                className={`text-4xl ${
                  theme === "dark" ? "text-gray-400" : "text-gray-400"
                }`}
              />
            </div>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Admins
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {roleCounts.admin}
                </p>
              </div>
              <FaUserShield className="text-4xl text-blue-500" />
            </div>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Creators
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {roleCounts.creator}
                </p>
              </div>
              <FaUserTie className="text-4xl text-green-500" />
            </div>
          </div>
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Normal Users
                </p>
                <p className="text-2xl font-bold text-green-00">
                  {roleCounts.user}
                </p>
              </div>
              <FaUserTie className="text-4xl text-green-300" />
            </div>
          </div>
        </div>
        {/* admin action  */}
        <div className="md:w-1/3">
          <AdminUserSideBar />
        </div>
      </div>

      {/* Filters and Search */}
      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow p-6 mb-8`}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setRoleFilter("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                roleFilter === "all"
                  ? "bg-purple-100 border-purple-500 text-purple-700"
                  : `${
                      theme === "dark"
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300"
                    }`
              }`}
            >
              <FaFilter />
              All
            </button>
            <button
              onClick={() => setRoleFilter("admin")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                roleFilter === "admin"
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : `${
                      theme === "dark"
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300"
                    }`
              }`}
            >
              <FaUserShield />
              Admins ({roleCounts.admin})
            </button>
            <button
              onClick={() => setRoleFilter("creator")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                roleFilter === "creator"
                  ? "bg-green-100 border-green-500 text-green-700"
                  : `${
                      theme === "dark"
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300"
                    }`
              }`}
            >
              <FaUserTie />
              Creators ({roleCounts.creator})
            </button>
            <button
              onClick={() => setRoleFilter("user")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                roleFilter === "user"
                  ? "bg-gray-100 border-gray-500 text-gray-700"
                  : `${
                      theme === "dark"
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300"
                    }`
              }`}
            >
              <FaUser />
              Users ({roleCounts.user})
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow overflow-hidden`}
      >
        <div
          className={`px-6 py-4 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2 className="text-lg font-semibold">
            Users ({filteredUsers.length})
          </h2>
        </div>

        {sortedUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No users found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
              >
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer  dark:hover:bg-purple-600"
                    onClick={() => {
                      if (sortField === "name") {
                        setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc"
                        );
                      } else {
                        setSortField("name");
                        setSortDirection("asc");
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span>User</span>
                      {sortField === "name" ? (
                        sortDirection === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer dark:hover:bg-purple-600"
                    onClick={() => {
                      if (sortField === "email") {
                        setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc"
                        );
                      } else {
                        setSortField("email");
                        setSortDirection("asc");
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Email</span>
                      {sortField === "email" ? (
                        sortDirection === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer dark:hover:bg-purple-600"
                    onClick={() => {
                      if (sortField === "role") {
                        setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc"
                        );
                      } else {
                        setSortField("role");
                        setSortDirection("asc");
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Role</span>
                      {sortField === "role" ? (
                        sortDirection === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer dark:hover:bg-purple-600"
                    onClick={() => {
                      if (sortField === "joined") {
                        setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc"
                        );
                      } else {
                        setSortField("joined");
                        setSortDirection("asc");
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Joined</span>
                      {sortField === "joined" ? (
                        sortDirection === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Verification code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody
                className={`${
                  theme === "dark"
                    ? "bg-gray-900 divide-y divide-gray-700"
                    : "bg-white divide-y divide-gray-200"
                }`}
              >
                {sortedUsers.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onEdit={handleUpdateUser}
                    onDelete={handleDeleteUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Update User Modal */}
      {openModal && (
        <UpdateUserModal
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          updateUserMutation={updateUserMutation}
          theme={theme}
          setOpenModal={setOpenModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete User"
        cancelText="Cancel"
        confirmVariant="bg-red-700 hover:bg-red-800"
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
