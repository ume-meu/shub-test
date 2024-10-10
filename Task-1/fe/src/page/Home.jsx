import React, { useState } from "react";
import Upload from "../components/Upload";
import Time from "../components/Time";
import DataTable from "../components/DataTable";

const Home = () => {
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleDataChange = () => {
    setDataUpdated(true);
  };

  const resetDataUpdated = () => {
    setDataUpdated(false);
  };

  return (
    <div className="p-8 w-full h-screen flex">
      <div className="w-[20%]">
        <div className="flex flex-col pr-4 justify-between h-full">
          <Upload onDataUpdated={handleDataChange}/>
          <Time />
        </div>
      </div>

      <div className="w-[80%] pl-4">
        <DataTable dataUpdated={dataUpdated} resetDataUpdated={resetDataUpdated}/>
      </div>
    </div>
  );
};

export default Home;
