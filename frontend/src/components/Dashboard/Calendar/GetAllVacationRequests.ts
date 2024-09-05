import { backendUrl } from "../../../assets/strings/backendUrl";

export default async function getAllVacationRequests() {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer: ${token}`,
  };
  const fetchResponse = await fetch(`${backendUrl}/getAllRequests`, {
    method: "GET",
    headers: headers,
  });
  if (!fetchResponse.ok) {
    console.log("Failed to get all vacation requests");
    //Create alert
  } else {
    const response = await fetchResponse.json();
    console.log("Fetched all vacation requests: ", response);
    return response.data;
  }
}
