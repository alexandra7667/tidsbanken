import { backendUrl } from "../../../../assets/strings/backendUrl";
import VacationRequest from "../../../../interfaces/VacationRequest";

export default async function postRequest(requestData: VacationRequest) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer: ${token}`,
  };
  const fetchResponse = await fetch(`${backendUrl}/request/createRequest`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      userId: requestData.userId,
      startDate: requestData.startDate,
      endDate: requestData.endDate,
      description: requestData.description,
    }),
  });
  if (!fetchResponse.ok) {
    console.log("Failed to post new request");
    // Create alert
  } else {
    // Create toast
    // Add to state variable my requests
  }
}
