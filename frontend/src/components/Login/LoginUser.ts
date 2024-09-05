import { backendUrl } from "../../assets/strings/backendUrl";
import { NavigateFunction } from "react-router-dom";
import User from "../../interfaces/User";

export default async function loginUser(
  loginData: {
    username: string;
    password: string;
  },
  navigate: NavigateFunction, 
  setUser: (user: User) => void,
  setLoginError: (error: boolean) => void,
  setNetworkError: (error: boolean) => void,
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const fetchResponse = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(loginData),
    });

    if (!fetchResponse.ok) {
      console.log("User provided wrong email and/or password");
      setLoginError(true);
    } else {
      const response = await fetchResponse.json();

      console.log("Login response: ", response);
      // localStorage.setItem("token", response.token);
      // setUser(response.userDto);
      // navigate("/dashboard");
    }
  } catch (error) {
    console.error("A network error occurred during login:", error);
    setNetworkError(true);
  }
}
