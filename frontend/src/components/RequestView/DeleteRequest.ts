import { backendUrl } from "../../../../assets/strings/backendUrl";


export default async function deleteRequest(requestId: string) {
  // const token = localStorage.getItem('token'):
  // const headers = {
  //   "Content-Type": "application/json",
  //    "Authorization": `Bearer: ${token}`
  // };
  // const fetchResponse = await fetch(`${backendUrl}/request/${requestId}`, {
  //   method: "DELETE",
  //   headers: headers,
  // });
  // if (!fetchResponse.ok) {
  //   console.log("Failed to delete vacation request");
  // Create alert
  // }
  // else {
  //   console.log("Request deleted")
  // }
}

//Cookie version:
// const fetchResponse = await fetch(`${backendUrl}/request/${requestId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     credentials: 'include' // Send JWT cookie
//   });