import React from "react";

const Time = ({ start, end }) => {
  return (
    <div className="flex flex-col items-center h-fit border-2 border-dashed border-[#536be0] hover:border-[#455ac1] rounded-lg p-4">
      <div className="time mb-4">
        <label>Start Time:</label>
        <input
          type="text"
          className="bg-transparent border-none outline-none"
          placeholder="HH:MM:SS"
          value={start}
        />
      </div>
      <div className="time">
        <label>End Time:</label>
        <input
          type="text"
          className="bg-transparent border-none outline-none"
          placeholder="HH:MM:SS"
          value={end}
        />
      </div>
    </div>
  );
};

export default Time;
