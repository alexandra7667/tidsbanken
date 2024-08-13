import { Dispatch, SetStateAction } from "react";
import { backendUrl } from "../../../../assets/strings/backendUrl";
import Comment from "../Interfaces/Comment";



export default async function getComments(
  requestId: string,
  setComments: Dispatch<SetStateAction<Comment[]>>
) {
  // const token = localStorage.getItem('token'):
  // const headers = {
  //   "Content-Type": "application/json",
  //    "Authorization": `Bearer: ${token}`
  // };
  // const fetchResponse = await fetch(`${backendUrl}/request/${requestId}/comment`, {
  //   method: "GET",
  //   headers: headers,
  // });
  // if (!fetchResponse.ok) {
  //   console.log("Failed to get comments");
  // Create alert
  // }
  // else {
  //   const response = await fetchResponse.json();
  //   setComments(response)
  // }
}

//Cookie version:
// const fetchResponse = await fetch(`${backendUrl}/request/${requestId}/comment`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     credentials: 'include' // Send JWT cookie
//   });
