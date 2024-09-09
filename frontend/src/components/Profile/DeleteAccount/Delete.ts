import { backendUrl } from "../../../assets/strings/backendUrl";

export default async function deleteThisAccount(userId: string) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer: ${token}`,
  };
  try {
    const fetchResponse = await fetch(`${backendUrl}/user/${userId}`, {
      method: "DELETE",
      headers: headers,
    });

    if (!fetchResponse.ok) {
      throw new Error(`Failed to delete account. Status: ${fetchResponse.status}`);
    }

    const response = await fetchResponse.json();

    return {
      status: "success",
      data: response,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return {
        status: "error",
        message: error.message,
      };
    } else {
      return {
        status: "error",
        message: "An unknown error occurred",
      };
    }
  }
}
