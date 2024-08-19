import { backendUrl } from "../../../assets/strings/backendUrl";

export default async function getUserById(
    userId: string,
    setUserData,
    setFoundUser
) {
  // const headers = {
  //   "Content-Type": "application/json",
  // };

  // const fetchResponse = await fetch(`${backendUrl}/user/${userId}`, {
  //   method: "GET",
  //   headers: headers,
  // });

  // if (!fetchResponse.ok) {
  //   console.log("Failed to get user");
  // Create alert
  // } else {
  //   const response = await fetchResponse.json();
  //   setUserData(response.data)
  //   setFoundUser(true)
  // }
  setFoundUser(true)
}
