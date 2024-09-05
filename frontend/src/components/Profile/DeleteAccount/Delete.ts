import { NavigateFunction } from "react-router-dom";
import { backendUrl } from "../../../assets/strings/backendUrl";

export default async function deleteThisAccount(
  navigate: NavigateFunction,
  userId: string,
) : Promise<boolean> {
  let loggedOut: boolean = false;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer: ${token}`,
  };
  const fetchResponse = await fetch(`${backendUrl}/user/${userId}`, {
    method: "DELETE",
    headers: headers,
  });
  if (!fetchResponse.ok) {
    console.log("Failed to delete user");
    // Create alert
  } else {
    console.log("User deleted successfully");
    loggedOut = true;
    // Create toast
  }
  return loggedOut;
}
