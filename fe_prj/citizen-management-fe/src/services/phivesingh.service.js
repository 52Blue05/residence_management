import { httpClient } from "./http.client";
import { API_ENDPOINTS } from "./api.config";

/**
 * Sanitation Fee Service (Phí Vệ Sinh)
 * Handles all sanitation fee-related API calls
 */
class PhiVeSinhService {
  /**
   * Get all sanitation fees
   */
  async getAll() {
    try {
      return await httpClient.get(API_ENDPOINTS.PHIVESINGH.GET_ALL);
    } catch (error) {
      console.error("Error fetching sanitation fees:", error);
      throw error;
    }
  }

  /**
   * Get sanitation fee by ID
   */
  async getById(id) {
    try {
      return await httpClient.get(API_ENDPOINTS.PHIVESINGH.GET_BY_ID(id));
    } catch (error) {
      console.error(`Error fetching sanitation fee ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create new sanitation fee
   */
  async create(data) {
    try {
      return await httpClient.post(API_ENDPOINTS.PHIVESINGH.CREATE, data);
    } catch (error) {
      console.error("Error creating sanitation fee:", error);
      throw error;
    }
  }

  /**
   * Update sanitation fee
   */
  async update(id, data) {
    try {
      return await httpClient.put(API_ENDPOINTS.PHIVESINGH.UPDATE(id), data);
    } catch (error) {
      console.error(`Error updating sanitation fee ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete sanitation fee
   */
  async delete(id) {
    try {
      return await httpClient.delete(API_ENDPOINTS.PHIVESINGH.DELETE(id));
    } catch (error) {
      console.error(`Error deleting sanitation fee ${id}:`, error);
      throw error;
    }
  }

  /**
   * Collect sanitation fee
   */
  async collect(data) {
    try {
      return await httpClient.post(API_ENDPOINTS.PHIVESINGH.CREATE, data);
    } catch (error) {
      console.error("Error collecting sanitation fee:", error);
      throw error;
    }
  }
}

export default new PhiVeSinhService();
