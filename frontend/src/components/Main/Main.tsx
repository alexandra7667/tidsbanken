import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import RequestHistory from "../RequestHistory/RequestHistory";
import RequestView from "../RequestView/RequestView";
import Admin from "../Admin/Admin.tsx";
import { useContext, useState } from "react";
import { UserContext } from "../../App.tsx";

export default function Main() {
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <>
      <Routes>
        {!user ? (
          <Route path="/" element={<Login />} />
        ) : (
          <>
            <Route
              path="/dashboard"
              element={<Dashboard darkMode={darkMode} />}
            />
            <Route
              path="/profile"
              element={
                <Profile darkMode={darkMode} setDarkMode={setDarkMode} />
              }
            />
            {/*<Route path="/requesthistory/:userId" element={<RequestHistory />} />*/}
            <Route path="/requesthistory" element={<RequestHistory />} />
            <Route path="/requestview/:requestId" element={<RequestView />} />
            {user.role == "Admin" && (
              <Route path="/admin" element={<Admin />} />
            )}
          </>
        )}
      </Routes>
    </>
  );
}
