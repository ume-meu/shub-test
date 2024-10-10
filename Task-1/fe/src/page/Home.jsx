import React from "react";
import Upload from "../components/Upload";
import Time from "../components/Time";
import DataTable from "../components/DataTable";
import { validateTime } from "../utils/helper";

const Home = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Form submitted");
  };

  return (
    <div className="p-8 w-full h-screen flex">
      <div className="w-[20%]">
        <div className="flex flex-col pr-4 justify-between h-full">
          <Upload  onSubmit={handleSubmit}/>
          <Time />
        </div>
      </div>

      <div className="w-[80%] pl-4">
        <DataTable />
      </div>
    </div>
  );
};

export default Home;
