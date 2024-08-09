import { backendUrl } from "../../../assets/strings/backendUrl";
import { NavigateFunction } from "react-router-dom";

export default async function loginRequest(
  loginData: {
    username: string;
    password: string;
  },
  navigate: NavigateFunction
) {
  // const headers = {
  //   "Content-Type": "application/json",
  // };

  // const fetchResponse = await fetch(`${backendUrl}/login`, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify(loginData),
  // });

  // if (!fetchResponse.ok) {
  //   console.log("Failed to log in user");
  // Create alert
  // } else {
  //   const response = await fetchResponse.json();

  //   localStorage.setItem("token", response.token);
  //   setUser(response);

  //   navigate("/dashboard");
  // }

  navigate("/dashboard");
}
