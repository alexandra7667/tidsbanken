import { backendUrl } from "../../../assets/strings/backendUrl";

export default async function patchUser(
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
  //   method: "PATCH",
  //   headers: headers,
  //   body: JSON.stringify(userData),
  // });

  // if (!fetchResponse.ok) {
  //   console.log("Failed to update user");
  // Create alert
  // } else {
  //   const response = await fetchResponse.json();
  //   Toast User was updated
  // }
}
