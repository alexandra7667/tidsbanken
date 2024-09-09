import { backendUrl } from "../../assets/strings/backendUrl";

export default async function loginUser(
  loginData: {
    username: string;
    password: string;
  }
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const fetchResponse = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(loginData),
    });

    if (!fetchResponse.ok) {
      return {
        status: 'error',
        message: 'Login Error: Wrong email or password',
      };
    }

    const response = await fetchResponse.json();
    return {
      status: 'success',
      data: response,
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Network Error: Unable to login',
    };
  }
}
