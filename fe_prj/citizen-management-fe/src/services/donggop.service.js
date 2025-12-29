import { httpClient } from "./http.client";
import { API_ENDPOINTS } from "./api.config";

/**
 * Donation Campaign Service (Đóng Góp)
 * Handles all donation-related API calls
 */
class DongGopService {
  /**
   * Get all donation campaigns
   */
  async getAll() {
    try {
      return await httpClient.get(API_ENDPOINTS.DONGGOP.GET_ALL);
    } catch (error) {
      console.error("Error fetching donation campaigns:", error);
      throw error;
    }
  }

  /**
   * Get donation campaign by ID
   */
  async getById(id) {
    try {
      return await httpClient.get(API_ENDPOINTS.DONGGOP.GET_BY_ID(id));
    } catch (error) {
      console.error(`Error fetching donation campaign ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create new donation campaign
   */
  async create(data) {
    try {
      return await httpClient.post(API_ENDPOINTS.DONGGOP.CREATE, data);
    } catch (error) {
      console.error("Error creating donation campaign:", error);
      throw error;
    }
  }

  /**
   * Update donation campaign
   */
  async update(id, data) {
    try {
      return await httpClient.put(API_ENDPOINTS.DONGGOP.UPDATE(id), data);
    } catch (error) {
      console.error(`Error updating donation campaign ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete donation campaign
   */
  async delete(id) {
    try {
      return await httpClient.delete(API_ENDPOINTS.DONGGOP.DELETE(id));
    } catch (error) {
      console.error(`Error deleting donation campaign ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get donation report/statistics
   */
  async getReport(filters = {}) {
    try {
      return await httpClient.get(API_ENDPOINTS.THONGKE.DONATION_REPORT, {
        params: filters,
      });
    } catch (error) {
      console.error("Error fetching donation report:", error);
      throw error;
    }
  }
}

export default new DongGopService();
