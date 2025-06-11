import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // Retrieve and decode the stored token
    const authToken = this.getToken();
    return authToken ? jwtDecode<JwtPayload>(authToken) : null;
  }

  loggedIn() {
    // Check if user has valid token
    const authToken = this.getToken();
    return authToken && !this.isTokenExpired(authToken) ? true : false;
  }

  isTokenExpired(token: string) {
    // Verify token expiration status
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  getToken(): string {
    // Retrieve token from storage
    return localStorage.getItem("auth_token") || "";
  }

  login(idToken: string) {
    // Store token and redirect to home
    localStorage.setItem("auth_token", idToken);
    window.location.assign("/");
  }

  logout() {
    // Clear token and redirect to login
    localStorage.removeItem("auth_token");
    window.location.assign("/login");
  }
}

export default new AuthService();