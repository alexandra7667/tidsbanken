import { backendUrl } from "../../../../assets/strings/backendUrl";
import VacationRequest from "../../../../interfaces/VacationRequest";

export default async function postIneligiblePeriod(requestData: VacationRequest) {
  const token = localStorage.getItem('token');
  const headers = {
    "Content-Type": "application/json",
     "Authorization": `Bearer: ${token}`
  };
  const fetchResponse = await fetch(`${backendUrl}/ineligible/createIneligible`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ //Might need conversion to ISO strings
      startDate: requestData.startDate,
      endDate: requestData.endDate,
    }),
  });
  if (!fetchResponse.ok) {
    console.log("Failed to post new ineligible period");
  //Create alert
  }
  else {
  // Create toast
  // Add to state variable my requests
  }
}
