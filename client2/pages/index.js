import React, { useContext,useState } from "react";

import AppContext from "../context/AppContext";
import FormLayoutDemo from "../components/forms/createStore";
import { Chart, Info, SearchBar, Price } from "../components";

export default function Home () {  
  const { symbol, setSymbol } = useContext(AppContext);
  const [ticker, setTicker] = useState("TSLA");
  const handleSearch = (ticker) => {
    setTicker(ticker);
  };
  return (
    <div>
      <div className="container">
        {/* {!user && !user.store && <FormLayoutDemo/>} */}
      {/* <SearchBar handleSearch={handleSearch} /> */}
      <Info ticker={symbol} />
      <Chart ticker={symbol} />
      </div>
    </div>
  );
};