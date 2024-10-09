"use client";
import Link from 'next/link';

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

    // Check for valid time
    const inputtedTime = new Date(time);
    const currentTime = new Date();
    if (inputtedTime > currentTime) {
      setError("Thời gian được nhập không được lớn hơn thời gian hiện tại");
      return;
    }
    if (isNaN(inputtedTime.getTime())) {
      setError("Thời gian được nhập không hợp lệ.");
      return;
    }

    if (!quantity) {
      console.log(time);
      setError("Hãy nhập Số lượng");
      return;
    }

    if (!pump) {
      setError("Hãy chọn Trụ");
      return;
    }

    if (!revenue) {
      setError("Hãy nhập Doanh thu");
      return;
    }

    if (!price) {
      setError("Hãy nhập Đơn giá");
      return;
    }

    setError(null);
    alert("Cập nhật thành công");
    setTime("");
    setQuantity("");
    setPump("");
    setRevenue("");
    setPrice("");
  };

  return (
    <div className="flex items-center justify-center h-screen w-full relative">
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
              <Link href="/">
                <button
                  className="text-sm flex items-center cursor-pointer hover:underline"
                >
                  <FaArrowLeft />
                  Đóng
                </button>
                </Link>
              <h1 className="font-bold text-2xl pt-4">Nhập giao dịch</h1>
            </div>
            <button
              className="text-sm bg-[#1e2a5e] h-fit text-[#edf1fb] hover:bg-[#2e3e86] rounded-lg px-4 py-2 whitespace-nowrap"
              type="submit"
            >
              Cập nhật
            </button>
          </header>

          <div className="p-4 relative z-10">
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
                <input
                  type="number"
                  name="Số lượng"
                  placeholder="3.03"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="input-form">
                <label>Trụ:</label>
                <select
                  name="Trụ"
                  placeholder="19800"
                  value={pump}
                  onChange={(e) => setPump(e.target.value)}
                >
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
                <input
                  type="number"
                  name="Doanh thu"
                  placeholder="60000"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>
              <div className="input-form">
                <label>Đơn giá:</label>
                <input
                  type="number"
                  name="Đơn giá"
                  placeholder="19800"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
    </div>
  );
};

export default page;
