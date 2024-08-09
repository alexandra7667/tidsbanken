import { backendUrl } from "../../../../assets/strings/backendUrl";

//Definiera Request 
interface Request {
  id: number;
  name: string;
  //etc....
}

export default async function getRequestHistory(setRequestHistory: (data: Request[]) => void) {
  // const token = localStorage.getItem('token'):
  // const headers = {
  //   "Content-Type": "application/json",
  //    "Authorization": `Bearer: ${token}`
  // };
  // const fetchResponse = await fetch(`${backendUrl}/user/${userData.id}/requests`, {
  //   method: "GET",
  //   headers: headers,
  // });
  // if (!fetchResponse.ok) {
  //   console.log("Failed to get vacation requests");
  // Create alert
  // }
  // else {
  //   const response = await fetchResponse.json();
  //   setRequests(response)
  // }
}

//Cookie version:
// const fetchResponse = await fetch(`${backendUrl}/user/${userData.id}/requests`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     credentials: 'include' // Send JWT cookie
//   });