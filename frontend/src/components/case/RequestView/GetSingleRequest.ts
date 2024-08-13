import { Dispatch, SetStateAction } from "react";
import { backendUrl } from "../../../../assets/strings/backendUrl";
import Request from "../Interfaces/Request";


export default async function getSingleRequest(requestId: string, setRequest: Dispatch<SetStateAction<Request | null>>) {
  // const token = localStorage.getItem('token'):
  // const headers = {
  //   "Content-Type": "application/json",
  //    "Authorization": `Bearer: ${token}`
  // };
  // const fetchResponse = await fetch(`${backendUrl}/request/${requestId}`, {
  //   method: "GET",
  //   headers: headers,
  // });
  // if (!fetchResponse.ok) {
  //   console.log("Failed to get vacation request");
  // Create alert
  // }
  // else {
  //   const response = await fetchResponse.json();
  //   setRequests(response)
  // }
}

//Cookie version:
// const fetchResponse = await fetch(`${backendUrl}/request/${requestId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     credentials: 'include' // Send JWT cookie
//   });