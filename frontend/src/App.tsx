import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import { Main }  from "./components/Main/Main.tsx";
import { useState, createContext, useEffect } from "react";
import restoreUser from "./restoreUser.ts"
import User from "./interfaces/User.ts";
import UserContextType from "./interfaces/UserContextType.ts";
import fetchData from "./functions/fetchData.ts";

const defaultUserContext: UserContextType = {
  user: null,
  setUser: () => {}, //Placeholder function if user is null
};

const UserContext = createContext<UserContextType>(defaultUserContext);

function App() {
  const [user, setUser] = useState<User | null>(null);

  

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Main />
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export { App, UserContext };
