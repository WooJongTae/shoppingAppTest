import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

const FileUpload = ({ images, onImageChange }) => {
  console.log(images);
  const handleDrop = async (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    try {
      const response = await axiosInstance.post(
        "/products/image",
        formData,
        config
      );
      console.log(response);
      onImageChange([...images, response.data.filename]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImage = [...images];
    newImage.splice(currentIndex, 1);
    onImageChange(newImage);
  };
  return (
    <div className="flex gap-4">
      {/* ()이거로되는지 체크 */}
      <Dropzone onDrop={(data) => handleDrop(data)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              className="min-w-[300px] h-[300px] border flex items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p className="text-2xl">+</p>
            </div>
          </section>
        )}
      </Dropzone>
      <div className="flex-grow  h-[300px] border flex justify-center items-center overflow-x-scroll overflow-y-hidden">
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img
              className="min-w-[300px] h-[300px]"
              src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
              alt={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
