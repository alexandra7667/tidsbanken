import { backendUrl } from "../../../assets/strings/backendUrl";
import { NavigateFunction } from "react-router-dom";

export default async function updateEmailRequest(
  newEmail: string,
  navigate: NavigateFunction
) {
  // const token = localStorage.getItem('token'):
  // const headers = {
  //   "Content-Type": "application/json",
  //    "Authorization": `Bearer: ${token}`
  // };
  // const fetchResponse = await fetch(`${backendUrl}/user/${userData.id}`, {
  //   method: "PATCH",
  //   headers: headers,
  //   body: JSON.stringify(newEmail),
  // });
  // if (!fetchResponse.ok) {
  //   console.log("Failed to update email");
  // Create alert
  // }
  // else {
  //   const response = await fetchResponse.json();
  // Create toast
  //   setUser(email=response.email);
  // }
}
