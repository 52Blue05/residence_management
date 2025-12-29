import { httpClient } from "./http.client";
import { API_ENDPOINTS } from "./api.config";

/**
 * Fee Type Service (Loại Phí)
 * Handles all fee type-related API calls
 */
class LoaiPhiService {
  /**
   * Get all fee types
   */
  async getAll() {
    try {
      return await httpClient.get(API_ENDPOINTS.LOAIPHI.GET_ALL);
    } catch (error) {
      console.error("Error fetching fee types:", error);
      throw error;
    }
  }

  /**
   * Get fee type by ID
   */
  async getById(id) {
    try {
      return await httpClient.get(API_ENDPOINTS.LOAIPHI.GET_BY_ID(id));
    } catch (error) {
      console.error(`Error fetching fee type ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create new fee type
   */
  async create(data) {
    try {
      return await httpClient.post(API_ENDPOINTS.LOAIPHI.CREATE, data);
    } catch (error) {
      console.error("Error creating fee type:", error);
      throw error;
    }
  }

  /**
   * Update fee type
   */
  async update(id, data) {
    try {
      return await httpClient.put(API_ENDPOINTS.LOAIPHI.UPDATE(id), data);
    } catch (error) {
      console.error(`Error updating fee type ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete fee type
   */
  async delete(id) {
    try {
      return await httpClient.delete(API_ENDPOINTS.LOAIPHI.DELETE(id));
    } catch (error) {
      console.error(`Error deleting fee type ${id}:`, error);
      throw error;
    }
  }
}

export default new LoaiPhiService();
