import { backendUrl } from "./assets/strings/backendUrl";
import User from "./interfaces/User";

export default async function restoreUser(storedToken: string) : Promise<User> {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${storedToken}`
    };

    const fetchUserResponse = await fetch(`${backendUrl}/user/getUser`, {
      method: "GET",
      headers: headers
    });

    if (!fetchUserResponse.ok) {
      console.log("Failed to get user from the database");
    }

    const returnedUser = await fetchUserResponse.json();

    console.log("Fetched user URL: ", returnedUser);
    
    return returnedUser;
  }