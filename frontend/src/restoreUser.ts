import { backendUrl } from "./assets/strings/backendUrl";
import User from "./interfaces/User";

export const restoreUser = async (storedToken: string, setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${storedToken}`
    };

    const fetchUserResponse = await fetch(`${backendUrl}/authentication/getUserByToken`, {
      method: "GET",
      headers: headers
    });

    if (!fetchUserResponse.ok) {
      throw new Error("Failed to get user from the database");
    }

    const returnedUser = await fetchUserResponse.json();

    console.log("Fetched user: ", returnedUser);

    setUser(returnedUser);
  }