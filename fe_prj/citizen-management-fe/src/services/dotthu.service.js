import { httpClient } from "./http.client";
import { API_ENDPOINTS } from "./api.config";

/**
 * Collection Period Service (Đợt Thu)
 * Handles all collection period-related API calls
 */
class DotThuService {
  /**
   * Get all collection periods
   */
  async getAll() {
    try {
      return await httpClient.get(API_ENDPOINTS.DOTTHU.GET_ALL);
    } catch (error) {
      console.error("Error fetching collection periods:", error);
      throw error;
    }
  }

  /**
   * Get collection period by ID
   */
  async getById(id) {
    try {
      return await httpClient.get(API_ENDPOINTS.DOTTHU.GET_BY_ID(id));
    } catch (error) {
      console.error(`Error fetching collection period ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create new collection period
   */
  async create(data) {
    try {
      return await httpClient.post(API_ENDPOINTS.DOTTHU.CREATE, data);
    } catch (error) {
      console.error("Error creating collection period:", error);
      throw error;
    }
  }

  /**
   * Update collection period
   */
  async update(id, data) {
    try {
      return await httpClient.put(API_ENDPOINTS.DOTTHU.UPDATE(id), data);
    } catch (error) {
      console.error(`Error updating collection period ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete collection period
   */
  async delete(id) {
    try {
      return await httpClient.delete(API_ENDPOINTS.DOTTHU.DELETE(id));
    } catch (error) {
      console.error(`Error deleting collection period ${id}:`, error);
      throw error;
    }
  }
}

export default new DotThuService();
