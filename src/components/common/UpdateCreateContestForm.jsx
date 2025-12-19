import React, { useState, useEffect } from "react";
import { useToast } from "../../provider/ToastProvider";
import axiosSecure from "../../api/axiosSecure";
import { categories } from "../../constants/categories";
import { photoUploadToCloudinary } from "../../utils/imgUploadToCloudinary";

export default function UpdateCreateContestForm({
  contest = null,
  onClose,
  onSuccess,
  userRole = "creator",
  refetchContests,
}) {
  const [formData, setFormData] = useState({
    contestName: "",
    image: "",
    description: "",
    taskInstruction: "",
    price: "",
    prizeMoney: "",
    contestType: "",
    deadline: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(contest?.image || "");
  const [status, setStatus] = useState(contest?.status || "pending");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { success, error } = useToast();

  // Initialize form data when contest prop changes
  useEffect(() => {
    if (contest) {
      setFormData({
        contestName: contest.contestName || "",
        image: contest.image || "",
        description: contest.description || "",
        taskInstruction: contest.taskInstruction || "",
        price: contest.price || "",
        prizeMoney: contest.prizeMoney || "",
        contestType: contest.contestType || "",
        deadline: contest.deadline ? contest.deadline.split("T")[0] : "",
      });
      setStatus(contest.status || "pending");
    } else {
      // Reset form for new contest
      setFormData({
        contestName: "",
        image: "",
        description: "",
        taskInstruction: "",
        price: "",
        prizeMoney: "",
        contestType: "",
        deadline: "",
      });
      setStatus("pending");
    }
  }, [contest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.contestName.trim()) {
      newErrors.contestName = "Contest name is required";
    }

    if (!formData.image.trim() && !imageFile) {
      newErrors.image = "Image is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.taskInstruction.trim()) {
      newErrors.taskInstruction = "Task instruction is required";
    }

    if (!formData.price || formData.price < 0) {
      newErrors.price = "Valid entry fee is required";
    }

    if (!formData.prizeMoney || formData.prizeMoney < 0) {
      newErrors.prizeMoney = "Valid prize money is required";
    }

    if (!formData.contestType) {
      newErrors.contestType = "Contest type is required";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      if (deadlineDate <= today) {
        newErrors.deadline = "Deadline must be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.image;

      // Upload image to Cloudinary if a file is selected
      if (imageFile) {
        imageUrl = await photoUploadToCloudinary(imageFile);
      }

      const payload = {
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
        prizeMoney: Number(formData.prizeMoney),
        deadline: new Date(formData.deadline).toISOString(),
        status,
      };
      console.log(payload);

      if (contest) {
        // Update existing contest
        await axiosSecure.patch(
          `/contest/update-contest/${contest._id}`,
          payload
        );
        refetchContests();
        success("Contest updated successfully");
      } else {
        // Create new contest
        await axiosSecure.post("/contest/create-contest", payload);
        refetchContests();
        success("Contest created successfully");
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error:", err);
      error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const canChangeStatus =
    userRole === "admin" || (userRole === "creator" && status === "completed");

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Contest Name</label>
          <input
            type="text"
            name="contestName"
            value={formData.contestName}
            onChange={handleChange}
            className={`input input-bordered w-full ${
              errors.contestName ? "input-error" : ""
            }`}
            placeholder="Enter contest name"
          />
          {errors.contestName && (
            <p className="text-red-500 text-sm mt-1">{errors.contestName}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Contest Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
                // Clear the image URL field when a file is selected
                setFormData((prev) => ({ ...prev, image: "" }));
              }
            }}
            className={`file-input file-input-bordered w-full ${
              errors.image ? "input-error" : ""
            }`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}

          {/* Image preview */}
          {(imagePreview || formData.image) && (
            <div className="mt-3">
              <label className="text-sm font-medium">Image Preview</label>
              <div className="mt-2">
                <img
                  src={imagePreview || formData.image}
                  alt="Contest preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Entry Fee ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`input input-bordered w-full ${
              errors.price ? "input-error" : ""
            }`}
            placeholder="0"
            min="0"
            step="0.01"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Prize Money ($)</label>
          <input
            type="number"
            name="prizeMoney"
            value={formData.prizeMoney}
            onChange={handleChange}
            className={`input input-bordered w-full ${
              errors.prizeMoney ? "input-error" : ""
            }`}
            placeholder="0"
            min="0"
            step="0.01"
          />
          {errors.prizeMoney && (
            <p className="text-red-500 text-sm mt-1">{errors.prizeMoney}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Contest Type</label>
          <select
            name="contestType"
            value={formData.contestType}
            onChange={handleChange}
            className={`select select-bordered w-full ${
              errors.contestType ? "select-error" : ""
            }`}
          >
            <option value="">Select contest type</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.contestType && (
            <p className="text-red-500 text-sm mt-1">{errors.contestType}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={`input input-bordered w-full ${
              errors.deadline ? "input-error" : ""
            }`}
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`textarea textarea-bordered w-full ${
            errors.description ? "textarea-error" : ""
          }`}
          placeholder="Describe your contest"
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Task Instruction</label>
        <textarea
          name="taskInstruction"
          value={formData.taskInstruction}
          onChange={handleChange}
          className={`textarea textarea-bordered w-full ${
            errors.taskInstruction ? "textarea-error" : ""
          }`}
          placeholder="Enter task instructions for participants"
          rows={4}
        />
        {errors.taskInstruction && (
          <p className="text-red-500 text-sm mt-1">{errors.taskInstruction}</p>
        )}
      </div>

      {canChangeStatus && (
        <div>
          <label className="text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered w-full"
          >
            {userRole === "admin" ? (
              <>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
              </>
            ) : (
              <option value="completed">Completed</option>
            )}
          </select>
        </div>
      )}

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          className="btn"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : contest ? (
            "Update Contest"
          ) : (
            "Create Contest"
          )}
        </button>
      </div>
    </form>
  );
}
