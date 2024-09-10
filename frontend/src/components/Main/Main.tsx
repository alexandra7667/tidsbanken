import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import { Dashboard } from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import RequestHistory from "../RequestHistory/RequestHistory";
import RequestView from "../RequestView/RequestView";
import Admin from "../Admin/Admin.tsx";
import { useContext } from "react";
import { UserContext } from "../../App.tsx";
import LoadingSpinner from "../Spinner/LoadingSpinner.tsx";

export default function Main({loading}) {
  const { user } = useContext(UserContext);

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/requesthistory/:userId"
              element={<RequestHistory />}
            />
            <Route path="/requestview/:requestId" element={<RequestView />} />
            {user.role == 1 && <Route path="/admin" element={<Admin />} />}
          </>
        )}
      </Routes>
    </>
  );
}
