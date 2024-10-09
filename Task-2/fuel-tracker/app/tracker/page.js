"use client";

import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const page = () => {

  const [error, setError] = useState(null);
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pump, setPump] = useState("");
  const [revenue, setRevenue] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!time) {
      setError("Hãy nhập Thời gian");
      return;
    }

    setError(null);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="w-[50%] h-fit bg-[#fff] rounded-lg text-[#1e2a5e]"
        style={{ boxShadow: "0 2px 3px rgba(30,42,94, 0.1)" }}
      >
        <header
          className="p-6 flex"
          style={{ boxShadow: "0 4px 6px rgba(30,42,94, 0.1)" }}
        >
          <div className="justify-between w-full text-start">
            <button className="text-sm flex items-center cursor-pointer hover:underline">
              <FaArrowLeft />
              Đóng
            </button>
            <h1 className="font-bold text-2xl pt-4">Nhập giao dịch</h1>
          </div>
          <button
            className="text-sm bg-[#1e2a5e] h-fit text-[#edf1fb] hover:bg-[#2e3e86] rounded-lg px-4 py-2 whitespace-nowrap"
            type="submit"
          >
            Cập nhật
          </button>
        </header>

        <div className="p-4">
          {error && (
            <p className="text-red-500 text-xs py-1 text-center items-center">
              {error}
            </p>
          )}

          <div>
            <div className="input-form">
              <label>Thời gian:</label>
              <input
                type="datetime-local"
                name="Thời gian"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="input-form">
              <label>Số lượng:</label>
              <input type="number" name="Số lượng" placeholder="3.03" />
            </div>
            <div className="input-form">
              <label>Trụ:</label>
              <select name="Trụ" placeholder="19800" id="">
                <option value="" disabled selected hidden></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="input-form">
              <label>Doanh thu:</label>
              <input type="number" name="Doanh thu" placeholder="60000" id="" />
            </div>
            <div className="input-form">
              <label>Đơn giá:</label>
              <input type="number" name="Đơn giá" placeholder="19800" id="" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
