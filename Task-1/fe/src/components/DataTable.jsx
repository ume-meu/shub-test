import React, { useEffect, useState } from "react";
import Cat from "../assets/cat.svg";
import axiosInstance from "../utils/axiosInstance";

const DataTable = ({ dataUpdated, resetDataUpdated }) => {
  const [header, setHeader] = useState([]);
  const [rows, setRows] = useState([]);

  const getAllData = async () => {
    try {
      const response = await axiosInstance.get("/get-all-data");
      if (response.data && response.data.header && response.data.rows) {
        setHeader(response.data.header);
        setRows(response.data.rows);
      } else {
        setHeader([]);
        setRows([]);
      }
      resetDataUpdated();
    } catch (error) {
      console.error("Failed to fetch data", error);
      resetDataUpdated();
      setHeader([]);
      setRows([]);
    }
  };

  useEffect(() => {
    if (dataUpdated) {
      getAllData();
    }

    const intervalId = setInterval(() => {
      getAllData();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [dataUpdated, resetDataUpdated]);

  return (
    <div className="h-full border-2 border-dashed border-[#536be0] hover:border-[#455ac1] overflow-auto">
      {header.length > 0 && rows.length > 0 ? (
        <table className="w-full border-collapse border-spacing-[8px_4px]">
          <thead>
            <tr>
              {header.map((head, headIdx) => (
                <th
                  className="px-8 py-2 whitespace-nowrap bg-[#455ac1] bg-opacity-40 border border-solid border-[#455ac1] text-[#536be0]"
                  key={headIdx}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowInx) => (
              <tr
                className="whitespace-nowrap bg-[#455ac1] bg-opacity-5 border border-[#455ac1] text-[#536be0]"
                key={rowInx}
              >
                {row.map((cell, cellIndex) => (
                  <td className="text-center" key={cellIndex}>
                    {cell}
                  </td> // Added text-right class here
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
