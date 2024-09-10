import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import Main from "./components/Main/Main.tsx";
import { useState, createContext, useEffect } from "react";
import User from "./interfaces/User.ts";
import UserContextType from "./interfaces/UserContextType.ts";
import ErrorContextType from "./interfaces/ErrorContextType.ts";
import fetchData from "./functions/fetchData.ts";
import ErrorAlert from "./components/Alert/ErrorAlert.tsx";

const defaultUserContext: UserContextType = {
  user: null,
  setUser: () => {}, //Placeholder function if user is null
};
const UserContext = createContext<UserContextType>(defaultUserContext);

const defaultErrorContext: ErrorContextType = {
  errorMessage: "",
  setErrorMessage: () => {},
};
const ErrorContext = createContext<ErrorContextType>(defaultErrorContext);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchAndSetUser();
    }
    else {
      setLoading(false);
    }
  }, []);

  async function fetchAndSetUser() {
    const response = await fetchData(`user`, "GET", null, "Token not valid.");
    if (response.status === "error") {
      console.error(response.message);
      if (response.message) setErrorMessage(response.message);
    } else {
      setUser(response.data);
      setLoading(false);
      console.log("app says user is ", user);
    }
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
          <Header />
          <Main loading={loading} />
          <Footer />
          {errorMessage !== "" && <ErrorAlert />}
        </ErrorContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export { App, UserContext, ErrorContext };
