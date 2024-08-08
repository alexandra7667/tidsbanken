import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";

export default function Main() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}
