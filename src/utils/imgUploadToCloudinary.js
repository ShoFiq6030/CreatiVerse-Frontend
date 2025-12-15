import axios from "axios";

export const photoUploadToCloudinary = async (photoFile) => {
    let photoURL = ""
    if (photoFile) {

        const allowed = ["jpg", "jpeg", "png", "webp", "gif"];
        const ext = photoFile.name.split(".").pop().toLowerCase();

        if (!allowed.includes(ext)) {
            return null
        }
        const formData = new FormData();
        formData.append("file", photoFile);
        formData.append(
            "upload_preset",
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        const cloudRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            formData
        );

        return photoURL = cloudRes.data.secure_url;
    }
    return photoURL

}