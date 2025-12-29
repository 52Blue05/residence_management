import { httpClient } from "./http.client";
import { API_ENDPOINTS } from "./api.config";

/**
 * Temporary Residents Service (Tạm Trú)
 * Handles all temporary resident-related API calls
 */
class TamTruService {
  /**
   * Get all temporary residents
   */
  async getAll() {
    try {
      return await httpClient.get(API_ENDPOINTS.TAMTRU.GET_ALL);
    } catch (error) {
      console.error("Error fetching temporary residents:", error);
      throw error;
    }
  }

  /**
   * Get temporary resident by ID
   */
  async getById(id) {
    try {
      return await httpClient.get(API_ENDPOINTS.TAMTRU.GET_BY_ID(id));
    } catch (error) {
      console.error(`Error fetching temporary resident ${id}:`, error);
      throw error;
    }
  }

  /**
   * Register new temporary resident
   */
  async register(data) {
    try {
      return await httpClient.post(API_ENDPOINTS.TAMTRU.CREATE, data);
    } catch (error) {
      console.error("Error registering temporary resident:", error);
      throw error;
    }
  }

  /**
   * Update temporary resident
   */
  async update(id, data) {
    try {
      return await httpClient.put(API_ENDPOINTS.TAMTRU.UPDATE(id), data);
    } catch (error) {
      console.error(`Error updating temporary resident ${id}:`, error);
      throw error;
    }
  }

  /**
   * Remove temporary resident
   */
  async delete(id) {
    try {
      return await httpClient.delete(API_ENDPOINTS.TAMTRU.DELETE(id));
    } catch (error) {
      console.error(`Error deleting temporary resident ${id}:`, error);
      throw error;
    }
  }
}

export default new TamTruService();
