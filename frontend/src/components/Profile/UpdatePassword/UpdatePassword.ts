import { backendUrl } from "../../../assets/strings/backendUrl";

export default async function updatePassword(password: {
  oldPassword: string;
  newPassword: string;
}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer: ${token}`,
  };
  try {
    const fetchResponse = await fetch(
      `${backendUrl}/user/${userId}/update_password`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(password),
      }
    );
    if (!fetchResponse.ok) {
      throw new Error(
        `Failed to update password. Status: ${fetchResponse.status}`
      );
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
