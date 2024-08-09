import { backendUrl } from "../../../assets/strings/backendUrl";
import { NavigateFunction } from "react-router-dom";

export default async function updatePasswordRequest(
  password: {
    oldPassword: string;
    newPassword: string;
  },
  navigate: NavigateFunction
) {
  // const token = localStorage.getItem('token'):
  // const headers = {
  //   "Content-Type": "application/json",
  //    "Authorization": `Bearer: ${token}`
  // };
  // const fetchResponse = await fetch(`${backendUrl}/user/${userData.id}/update_password`, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify(password),
  // });
  // if (fetchResponse.status === 403) {  //403 Forbidden
  //   console.log("Old password is incorrect");
  // Create alert
  // }
  // else if (fetchResponse.status === 400) {
  //   console.log("New password could not be set");
  // Create alert
  // }
  // else if (fetchResponse.status === 200){
  //   console.log("Password updated successfully");
  // Create toast
  // }
}
