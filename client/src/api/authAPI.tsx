import { UserLogin } from "../interfaces/UserLogin";

const authenticate = async (credentials: UserLogin) => {
  // Implementing login functionality
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorMsg = await response.json();
      throw new Error(errorMsg.message || "Failed to authenticate");
    }

    const authData = await response.json();
    return authData;
  } catch (err) {
    console.error("Auth error:", err);
    throw err;
  }
};

export { authenticate };