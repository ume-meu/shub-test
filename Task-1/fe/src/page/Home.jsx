import React from "react";
import Upload from "../components/Upload";
import Time from "../components/Time";
import DataTable from "../components/DataTable";
import { validateTime } from "../utils/helper";

const Home = () => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from auto-reloading
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="p-8 w-full h-screen flex">
      <div className="w-[20%]">
        <div className="flex flex-col pr-4 justify-between h-full" onSubmit={handleSubmit}>
          <Upload />
          <Time />
          <button type="submit" className="w-full bg-[#536be0] hover:bg-[#455ac1] text-[#f2f7ff] rounded-lg py-2">
            Calculate
          </button>
        </div>
      </div>

      <div className="w-[80%] pl-4">
        <DataTable />
      </div>
    </div>
  );
};

export default Home;
