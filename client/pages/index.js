import React, { useContext,useState,useEffect } from "react";

import AppContext from "../context/AppContext";
import { Chart, Info } from "../components";
import { useRouter } from "next/router";

export default function Home () {  
  const { symbol } = useContext(AppContext);
  const router = useRouter();

  const { isAuthenticated } = useContext(AppContext);
  const [ticker, setTicker] = useState("TSLA");
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // redirect if you're already logged in
    }
  }, []);
  const handleSearch = (ticker) => {
    setTicker(ticker);
  };
  return (
    <div>
      <div className="container">
      {isAuthenticated && <Info ticker={symbol} />}
      {isAuthenticated && <Chart ticker={symbol} />}
      </div>
    </div>
  );
};