import React, { useState } from "react";
import Paw from "../assets/paw.svg";
import axiosInstance from "../utils/axiosInstance";
import { validateFile } from "../utils/helper";

const Upload = () => {
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  // upload file
  const upload = async () => {
    if (!validateFile(file)) {
      setError(
        "Định dạng tệp không hợp lệ. Vui lòng tải lên tệp .xlsx hợp lệ."
      );
      return;
    }

    setError(null);

    // const formData = new FormData();
    // formData.append("file", file);
    // axiosInstance.post("/upload", formData);
  };

  return (
    <div className="h-fit items-center flex flex-col border-2 border-dashed border-[#536be0] hover:border-[#455ac1] rounded-lg text-[#455ac1]">
      <div className="py-16 items-center flex flex-col">
        <img src={Paw} alt="Paw" className="w-[30%]" />
        <p className="text-[#455ac1] text-lg text-opacity-50">
          Drag or drop file here
        </p>
      </div>

      <div className="w-full text-center font-bold before:left-0 after:right-0 mx-0 file">
        *.xlsx
      </div>

      <div className="py-12">
        <label className="hover:underline" onClick={upload}>
          <input type="file" className="hidden" />
          Choose File
        </label>
      </div>

      {error && (
        <p className="text-red-500 text-xs py-1 text-center items-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default Upload;
