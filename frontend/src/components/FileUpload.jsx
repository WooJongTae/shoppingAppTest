import React from "react";
import Dropzone from "react-dropzone";

const FileUpload = ({ images, onImageChange }) => {
  return (
    <div className="flex gap-4">
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
      <div className="flex-grow"></div>
    </div>
  );
};

export default FileUpload;
