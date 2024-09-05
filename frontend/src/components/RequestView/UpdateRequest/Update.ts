import { backendUrl } from "../../../assets/strings/backendUrl";

export default async function updateRequest(
  requestId: string,
  updatedFields: { title: string; startDate: string; endDate: string }
) {
  // const token = localStorage.getItem('token'):
  // const headers = {
  //   "Content-Type": "application/json",
  //    "Authorization": `Bearer: ${token}`
  // };
  // const fetchResponse = await fetch(`${backendUrl}/request/${requestId}`, {
  //   method: "PATCH",
  //   headers: headers,
  //   body: JSON.stringify(updatedFields),
  // });
  // if (!fetchResponse.ok) {
  //   console.log("Failed to update request");
  // Create alert
  // }
  // else {
  //   const response = await fetchResponse.json();
  // Create toast
  //   setRequest
  // }
}
