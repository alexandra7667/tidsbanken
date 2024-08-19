import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import RequestHistory from "../RequestHistory/RequestHistory";
import RequestView from "../RequestView/RequestView.tsx";
import Admin from "../Admin/Admin.tsx";

export default function Main() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        {/*<Route path="/requesthistory/:userId" element={<RequestHistory />} />*/}
        <Route path="/requesthistory" element={<RequestHistory />} />
        <Route path="/requestview/:requestId" element={<RequestView />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}
