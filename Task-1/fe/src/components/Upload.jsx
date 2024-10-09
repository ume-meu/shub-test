import React from "react";
import Paw from '../assets/paw.svg';

const Upload = () => {
  return (
    <div className="h-fit items-center flex flex-col border-2 border-dashed border-[#536be0] hover:border-[#455ac1] rounded-lg text-[#455ac1]">
      <div className="py-16 items-center flex flex-col">
        <img src={Paw} alt="Paw" className="w-[30%]"/>
        <p className="text-[#455ac1] text-lg text-opacity-50">Drag or drop file here</p>
      </div>

      <div className="w-full text-center font-bold before:left-0 after:right-0 mx-0 file">*.xlsx</div>

      <div className="py-12">
        <label className="cursor-pointer hover:underline text-base">
          <input type="file" className="hidden" />
          Choose file
        </label>
      </div>
    </div>
  );
};

export default Upload;
