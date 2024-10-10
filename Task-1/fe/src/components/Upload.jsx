import React, { useEffect, useState } from "react";
import Paw from "../assets/paw.svg";
import axiosInstance from "../utils/axiosInstance";
import { validateFile } from "../utils/helper";

const Upload = ({ onDataUpdated }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const [drop, setDrop] = useState(false);
  const [up, setUpload] = useState(false);

  // Handle Upload File
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setUpload(true);

    if (!validateFile(uploadedFile)) {
      setError("Invalid file format. Please upload a valid .xlsx file.");
      return;
    }

    setError(null);
    setFile(uploadedFile);
  };

  // Handle Drag and Drop File
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (!validateFile(droppedFile)) {
      setError("Vui lòng tải lên tệp .xlsx hợp lệ.");
      return;
    }
    setDrop(true);

    setError(null);
    setFile(droppedFile);
  };

  // upload file
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
        },
      });

      setSuccess("Tải tệp thành công.");

      setTimeout(() => {
        setSuccess(null);
      }, 2000);
      onDataUpdated();

      setDrop(false);
      setUpload(false);
      setFile(null);

      console.log(res.data);
    } catch (error) {
      setError(error.response.data.message || "Error uploading file");
    }
    console.log(formData.get("file"));
  };

  return (
    <div
      className="relative h-fit items-center flex flex-col border-2 border-dashed border-[#536be0] hover:border-[#455ac1] rounded-lg text-[#455ac1]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {success && (
        <p className="text-[#4fadbe] text-xs absolute top-1 text-center items-center">
          {success}
        </p>
      )}

      {/* Drag and drop File */}
      <div className="py-14">
        {drop ? (
          <div className="flex flex-col w-full text-center justify-between">
            <p className="font-bold text-lg">{file.name}</p>
            <div>
              <button
                onClick={() => {
                  setFile(null);
                  setDrop(false);
                }}
                className="bg-[#952E4B] bg-opacity-10 py-1 px-3 text-base mr-2 rounded-md hover:bg-opacity-20 hover:text-[#952E4B]"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="bg-[#014955] bg-opacity-10 py-1 px-3 text-base ml-2 rounded-md hover:bg-opacity-20 hover:text-[#014955]"
              >
                Upload
              </button>
            </div>
          </div>
        ) : (
          <div className="items-center flex flex-col">
            <img src={Paw} alt="Paw" className="w-[30%]" />
            <p className="text-[#455ac1] text-lg text-opacity-50">
              Kéo thả tệp vào đây
            </p>
          </div>
        )}
      </div>

      <div className="w-full text-center font-bold before:left-0 after:right-0 mx-0 file">
        *.xlsx
      </div>

      {/* Upload File */}
      <div className="py-12">
        {up ? (
          <div className="flex flex-col w-full text-center justify-between">
            <p className="font-bold text-base">{file.name}</p>
            <div>
              <button
                onClick={() => {
                  setFile(null);
                  setUpload(false);
                }}
                className="bg-[#952E4B] bg-opacity-10 py-1 px-2 text-sm mr-2 rounded-md hover:bg-opacity-20 hover:text-[#952E4B]"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="bg-[#014955] bg-opacity-10 py-1 px-2 text-sm ml-2 rounded-md hover:bg-opacity-20 hover:text-[#014955]"
              >
                Upload
              </button>
            </div>
          </div>
        ) : (
          <label className="bg-[#455ac1] bg-opacity-10 py-2 px-4 rounded-md hover:bg-opacity-20">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx"
            />
            Tải tệp
          </label>
        )}
      </div>

      {error && (
        <p className="text-[#c5456a] text-xs absolute bottom-1 text-center items-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default Upload;
