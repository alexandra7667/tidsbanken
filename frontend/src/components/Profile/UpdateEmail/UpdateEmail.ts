import { backendUrl } from "../../../assets/strings/backendUrl";

export default async function updateEmail(newEmail: string, userId: string) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer: ${token}`,
  };

  try {
    const fetchResponse = await fetch(`${backendUrl}/user/${userId}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({ email: newEmail }),
    });

    if (!fetchResponse.ok) {
      throw new Error(`Failed to update email. Status: ${fetchResponse.status}`);
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
