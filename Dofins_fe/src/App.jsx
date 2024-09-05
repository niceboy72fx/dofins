import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import {  searchPopUp } from "./state";
import { useRecoilValue } from "recoil";
import PopUp from "./components/popUp";

function App() {
  const [loading, setLoading] = useState(true);
  const pop = useRecoilValue(searchPopUp);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {pop.open === true ? <PopUp emits={{}} state="searchPopUp"   /> : null}
      <Outlet />
    </>
  );
}

export default App;
