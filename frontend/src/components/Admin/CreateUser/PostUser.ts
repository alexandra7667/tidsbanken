import { backendUrl } from "../../../assets/strings/backendUrl";

export default async function postUser(
  userData: {
    username: string;
    password: string;
    email: string;
  },
) {
  // const headers = {
  //   "Content-Type": "application/json",
  // };

  // const fetchResponse = await fetch(`${backendUrl}/user`, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify(userData),
  // });

  // if (!fetchResponse.ok) {
  //   console.log("Failed to create user");
  // Create alert
  // } else {
  //   const response = await fetchResponse.json();
  //   Toast New user was created
  // }
}
