import { httpClient } from "./http.client";
import { API_ENDPOINTS } from "./api.config";

/**
 * Residents Service (Nhân Khẩu)
 * Handles all resident-related API calls
 */
class NhanKhauService {
  /**
   * Get all residents
   */
  async getAll() {
    try {
      return await httpClient.get(API_ENDPOINTS.NHANKHAU.GET_ALL);
    } catch (error) {
      console.error("Error fetching residents:", error);
      throw error;
    }
  }

  /**
   * Get resident by ID
   */
  async getById(id) {
    try {
      return await httpClient.get(API_ENDPOINTS.NHANKHAU.GET_BY_ID(id));
    } catch (error) {
      console.error(`Error fetching resident ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get residents by household ID
   */
  async getByHousehold(hoKhauId) {
    try {
      return await httpClient.get(
        API_ENDPOINTS.NHANKHAU.GET_BY_HOUSEHOLD(hoKhauId)
      );
    } catch (error) {
      console.error(
        `Error fetching residents for household ${hoKhauId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Add new resident (newborn)
   */
  async addNew(data) {
    try {
      return await httpClient.post(API_ENDPOINTS.NHANKHAU.CREATE, data);
    } catch (error) {
      console.error("Error adding new resident:", error);
      throw error;
    }
  }

  /**
   * Update resident information
   */
  async update(data) {
    try {
      return await httpClient.put(API_ENDPOINTS.NHANKHAU.UPDATE, data);
    } catch (error) {
      console.error("Error updating resident:", error);
      throw error;
    }
  }

  /**
   * Change household head
   */
  async changeHead(data) {
    try {
      return await httpClient.put(API_ENDPOINTS.NHANKHAU.CHANGE_HEAD, data);
    } catch (error) {
      console.error("Error changing household head:", error);
      throw error;
    }
  }

  /**
   * Delete resident
   */
  async delete(id) {
    try {
      return await httpClient.delete(API_ENDPOINTS.NHANKHAU.DELETE(id));
    } catch (error) {
      console.error(`Error deleting resident ${id}:`, error);
      throw error;
    }
  }
}

export default new NhanKhauService();
