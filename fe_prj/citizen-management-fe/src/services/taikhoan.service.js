import { httpClient } from "./http.client";
import { API_ENDPOINTS } from "./api.config";

/**
 * Account Service (Tài Khoản)
 * Handles all account-related API calls
 */
class TaiKhoanService {
  /**
   * Get all accounts
   */
  async getAll() {
    try {
      return await httpClient.get(API_ENDPOINTS.TAIKHOAN.GET_ALL);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw error;
    }
  }

  /**
   * Get account by ID
   */
  async getById(id) {
    try {
      return await httpClient.get(API_ENDPOINTS.TAIKHOAN.GET_BY_ID(id));
    } catch (error) {
      console.error(`Error fetching account ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create new account
   */
  async create(data) {
    try {
      return await httpClient.post(API_ENDPOINTS.TAIKHOAN.CREATE, data);
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  /**
   * Update account
   */
  async update(id, data) {
    try {
      return await httpClient.put(API_ENDPOINTS.TAIKHOAN.UPDATE(id), data);
    } catch (error) {
      console.error(`Error updating account ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete account
   */
  async delete(id) {
    try {
      return await httpClient.delete(API_ENDPOINTS.TAIKHOAN.DELETE(id));
    } catch (error) {
      console.error(`Error deleting account ${id}:`, error);
      throw error;
    }
  }

  /**
   * Change password
   */
  async changePassword(id, oldPassword, newPassword) {
    try {
      return await httpClient.put(API_ENDPOINTS.TAIKHOAN.UPDATE(id), {
        oldPassword,
        newPassword,
      });
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }
}

export default new TaiKhoanService();
