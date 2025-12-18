import React, { useState } from "react";
import { useToast } from "../../provider/ToastProvider";
import axiosSecure from "../../api/axiosSecure";
import { useParams } from "react-router";
import { photoUploadToCloudinary } from "../../utils/imgUploadToCloudinary";

export default function ContestSubmissionForm({
  onClose,
  refetch,
  submissionDataRefetch,
}) {
  const [submissionText, setSubmissionText] = useState("");
  const [submissionImage, setSubmissionImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  const { contestId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      if (submissionImage) {
        imageUrl = await photoUploadToCloudinary(submissionImage);
      }

      const payload = {
        submissionImg: imageUrl,
        submissionText,
      };

      const res = await axiosSecure.post(`/submissions/${contestId}`, payload);
      // console.log(res);
      success(res.massage || "Submission Successfully");
      refetch();
      submissionDataRefetch();
      onClose?.();
    } catch (err) {
      console.log(err);
      error(err.message || "Failed to create submission");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSubmissionImage(file);
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
        <div>
          <label className="text-sm">Submission Text</label>
          <textarea
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
        </div>
        <div>
          <label className="text-sm">Submission Image</label>
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
        <div className="flex gap-2">
          <button
            className="btn bg-indigo-600 text-white"
            type="submit"
            disabled={loading}
          >
            Submit
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
