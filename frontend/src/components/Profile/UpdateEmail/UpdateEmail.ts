import { backendUrl } from "../../../assets/strings/backendUrl";

export default async function updateEmail(
  newEmail: string, userId: string
){
  const token = localStorage.getItem('token');
  const headers = {
    "Content-Type": "application/json",
     "Authorization": `Bearer: ${token}`
  };
  const fetchResponse = await fetch(`${backendUrl}/user/${userId}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(newEmail),
  });
  if (!fetchResponse.ok) {
    console.log("Failed to update email");
  // Create alert
  }
  else {
    const response = await fetchResponse.json();
  // Create toast
    return response.data;
  }
}
