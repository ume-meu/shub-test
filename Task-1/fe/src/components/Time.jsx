import React, { useState } from "react";
import { trimTime } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Time = () => {
  const [error, setError] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState(false);
  const [totalAmount, setTotalAmount] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getAmount = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const params = new URLSearchParams({
        start,
        end,
      }).toString();

      const response = await axiosInstance.get(`/query?${params}`);

      if (response.data && response.data.total_amount !== undefined) {
        setResult(true);
        setTotalAmount(response.data.total_amount);
        console.log("Total Amount:", response.data.total_amount);
      }
    } catch (error) {
      setError(error.response.data.message || "Error uploading file");
    }
  };

  return (
    <div>
      {result ? (
        <div className="relative flex flex-col items-center text-center h-fit border-2 border-dashed border-[#536be0] hover:border-[#455ac1] rounded-lg px-4 py-8">
          <div className="mb-2">
            <label className="text-[#455ac1] text-sm font-medium text-opacity-50 block w-full">
              Giờ bắt đầu - Giờ kết thúc
            </label>
            <div className="text-[#455ac1] text-base font-bold text-opacity-60">
              {start} - {end}
            </div>
          </div>
          <label className="mb-6 text-[#455ac1] text-lg font-bold">
            {totalAmount} (VNĐ)
          </label>

          <button
            type="submit"
            className="w-full bg-[#536be0] bg-opacity-70 hover:bg-opacity-90 text-[#f2f7ff] rounded-lg py-2 mb-2"
            onClick={() => setResult(false)}
          >
            Cài lại
          </button>
        </div>
      ) : (
        <form className="relative flex flex-col items-center h-fit border-2 border-dashed border-[#536be0] hover:border-[#455ac1] rounded-lg px-4 py-8">
          <div className="time mb-6">
            <label>Giờ bắt đầu:</label>
            <input
              type="text"
              className="bg-transparent border-none outline-none"
              placeholder="HH:MM:SS"
              value={trimTime(start)}
              onChange={(e) => {
                setStart(e.target.value);
              }}
            />
          </div>
          <div className="time mb-6">
            <label>Giờ kết thúc:</label>
            <input
              type="text"
              className="bg-transparent border-none outline-none"
              placeholder="HH:MM:SS"
              value={trimTime(end)}
              onChange={(e) => {
                setEnd(e.target.value);
              }}
            />
          </div>

          <button
            onSubmit={handleSubmit}
            onClick={getAmount}
            type="submit"
            className="w-full bg-[#536be0] hover:bg-[#455ac1] text-[#f2f7ff] rounded-lg py-2 mb-2"
          >
            Tính toán
          </button>

          {error && (
            <p className="absolute text-red-500 text-xs bottom-1 px-1 text-center items-center">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default Time;
