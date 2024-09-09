import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import { Dashboard } from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import RequestHistory from "../RequestHistory/RequestHistory";
import RequestView from "../RequestView/RequestView";
import Admin from "../Admin/Admin.tsx";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../../App.tsx";
import ErrorAlert from "../Alert/ErrorAlert.tsx";
import ErrorContextType from "../../interfaces/ErrorContextType.ts";
import fetchData from "../../functions/fetchData.ts";

const defaultErrorContext: ErrorContextType = {
  errorMessage: "",
  setErrorMessage: () => {},
};

const ErrorContext = createContext<ErrorContextType>(defaultErrorContext);

function Main() {
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchAndSetUser(storedToken);
    }
  }, []);

  async function fetchAndSetUser(storedToken: string) {
    // const storedUser = await restoreUser(storedToken);
    const response = await fetchData(
      `user`,
      "GET",
      null,
      "Token not valid."
    );
    if (response.status === "error") {
      console.error(response.message);
      if (response.message) setErrorMessage(response.message);
    } else {
      setUser(response.data.userDTO);
    }
  }

  return (
    <>
      <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
        <Routes>
          {!user ? (
            <Route path="/" element={<Login />} />
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requesthistory/:userId" element={<RequestHistory />} />
              <Route path="/requestview/:requestId" element={<RequestView />} />
              {user.role == "Admin" && (
                <Route path="/admin" element={<Admin />} />
              )}
            </>
          )}
        </Routes>
        {errorMessage !== "" && <ErrorAlert />}
      </ErrorContext.Provider>
    </>
  );
}

export { Main, ErrorContext };