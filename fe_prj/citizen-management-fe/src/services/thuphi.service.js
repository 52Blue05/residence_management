import { httpClient } from "./http.client";
import { API_ENDPOINTS } from "./api.config";

/**
 * Fee Collection Service (Thu Phí)
 * Handles all fee collection-related API calls
 */
class ThuPhiService {
  /**
   * Get all fee collections
   */
  async getAll() {
    try {
      return await httpClient.get(API_ENDPOINTS.THUPHI.GET_ALL);
    } catch (error) {
      console.error("Error fetching fee collections:", error);
      throw error;
    }
  }

  /**
   * Get fee collection by ID
   */
  async getById(id) {
    try {
      return await httpClient.get(API_ENDPOINTS.THUPHI.GET_BY_ID(id));
    } catch (error) {
      console.error(`Error fetching fee collection ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get fee collections by household
   */
  async getByHousehold(hoKhauId) {
    try {
      return await httpClient.get(
        API_ENDPOINTS.THUPHI.GET_BY_HOUSEHOLD(hoKhauId)
      );
    } catch (error) {
      console.error(`Error fetching fees for household ${hoKhauId}:`, error);
      throw error;
    }
  }

  /**
   * Create new fee collection
   */
  async create(data) {
    try {
      return await httpClient.post(API_ENDPOINTS.THUPHI.CREATE, data);
    } catch (error) {
      console.error("Error creating fee collection:", error);
      throw error;
    }
  }

  /**
   * Update fee collection
   */
  async update(id, data) {
    try {
      return await httpClient.put(API_ENDPOINTS.THUPHI.UPDATE(id), data);
    } catch (error) {
      console.error(`Error updating fee collection ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete fee collection
   */
  async delete(id) {
    try {
      return await httpClient.delete(API_ENDPOINTS.THUPHI.DELETE(id));
    } catch (error) {
      console.error(`Error deleting fee collection ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get fee report
   */
  async getReport(filters = {}) {
    try {
      return await httpClient.get(API_ENDPOINTS.THONGKE.FEE_REPORT, {
        params: filters,
      });
    } catch (error) {
      console.error("Error fetching fee report:", error);
      throw error;
    }
  }
}

export default new ThuPhiService();
