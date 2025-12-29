/**
 * Authentication Service
 * Handles login, logout, and token management
 */
import { httpClient } from "./http.client";

class AuthService {
  /**
   * Login user with email and password (plain text comparison)
   */
  async login(credentials) {
    try {
      const { email, password, keepSignedIn } = credentials;

      // Gọi API login, backend sẽ so sánh email và password không mã hóa
      const response = await httpClient.post("/auth/login", {
        email,
        password,
        keepSignedIn,
      });

      if (response.token) {
        httpClient.setAuthToken(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.user?.id);
        localStorage.setItem("userRole", response.user?.role);

        if (keepSignedIn) {
          localStorage.setItem("keepSignedIn", "true");
        }
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      httpClient.clearAuthToken();
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      // Optionally call backend logout endpoint
      // await httpClient.post('/auth/logout', {});
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  /**
   * Refresh token
   */
  async refreshToken() {
    try {
      const response = await httpClient.post("/auth/refresh", {});

      if (response.token) {
        httpClient.setAuthToken(response.token);
      }

      return response;
    } catch (error) {
      console.error("Token refresh error:", error);
      // If refresh fails, clear auth
      httpClient.clearAuthToken();
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      throw error;
    }
  }

  /**
   * Get current user info
   */
  async getCurrentUser() {
    try {
      return await httpClient.get("/auth/me");
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!httpClient.getAuthToken();
  }

  /**
   * Get stored user role
   */
  getUserRole() {
    return localStorage.getItem("userRole");
  }

  /**
   * Change password
   */
  async changePassword(oldPassword, newPassword) {
    try {
      return await httpClient.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }
}

export default new AuthService();
