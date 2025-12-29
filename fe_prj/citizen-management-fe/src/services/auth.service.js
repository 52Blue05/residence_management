/**
 * Authentication Service
 * Handles login, logout, and token management
 */
import { httpClient } from "./http.client";

class AuthService {
  /**
   * Login user
   */
  async login(username, password) {
    try {
      const response = await httpClient.post("/auth/login", {
        username,
        password,
      });

      if (response.token) {
        httpClient.setAuthToken(response.token);
        localStorage.setItem("userId", response.id);
        localStorage.setItem("userRole", response.role);
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
