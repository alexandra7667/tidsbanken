import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login.tsx";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import RequestHistory from "../RequestHistory/RequestHistory";

export default function Main() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myrequests" element={<RequestHistory />} />
      </Routes>
    </>
  );
}
