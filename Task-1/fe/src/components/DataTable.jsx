import React, { useState } from "react";
import Cat from "../assets/cat.svg";

const DataTable = () => {
  const [data, setData] = useState(false);
  return (
    <div className="h-full border-2 border-dashed border-[#536be0] hover:border-[#455ac1]">
      {data ? (
        ""
      ) : (
        <div className="flex flex-col items-center justify-center h-screen mt-[-40px]">
          <div className="flex flex-col items-center justify-center">
            <img src={Cat} alt="No data" className="w-60" />
            <p className="text-lg font-bold text-[#455ac1] text-center -mt-6">
            Không có gì được hiển thị ở đây! Hãy thử tải lên tệp mới.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
