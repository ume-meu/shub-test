import React, { useState } from "react";
import { validateTime } from "../utils/helper";

const Time = () => {
  const [error, setError] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!start) {
      setError("Cần nhập giờ bắt đầu");
      return;
    }

    if (!validateTime(start)) {
      setError("Cần nhập đúng định dạng giờ bắt đầu: HH:MM:SS.");
      return
    }

    if (!end) {
      setError("Cần nhập giờ kết thúc");
      return;
    }

    if (!validateTime(end)) {
      setError("Cần nhập đúng định dạng giờ kết thúc: HH:MM:SS.");
      return
    }

    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
    if (startTime >= endTime) {
      setError("Thời gian bắt đầu không được lớn hơn thời gian kết thúc.");
      return;
    }

    setError(null);
  };

  return (
    <form
      className="relative flex flex-col items-center h-fit border-2 border-dashed border-[#536be0] hover:border-[#455ac1] rounded-lg px-4 py-8"
      onSubmit={handleSubmit}
    >
      <div className="time mb-6">
        <label>Giờ bắt đầu:</label>
        <input
          type="text"
          className="bg-transparent border-none outline-none"
          placeholder="HH:MM:SS"
          value={start}
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
          value={end}
          onChange={(e) => {
            setEnd(e.target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#536be0] hover:bg-[#455ac1] text-[#f2f7ff] rounded-lg py-2 mb-2"
      >
        Calculate
      </button>

      {error && (
        <p className="absolute text-red-500 text-xs bottom-1 px-1 text-center items-center">
          {error}
        </p>
      )}
    </form>
  );
};

export default Time;
