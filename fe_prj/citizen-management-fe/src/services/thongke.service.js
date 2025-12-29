import { httpClient } from "./http.client";
import { API_ENDPOINTS } from "./api.config";

/**
 * Statistics/Report Service (Thống Kê)
 * Handles all statistics and report-related API calls
 */
class ThongKeService {
  /**
   * Get fee collection report
   */
  async getFeeReport(filters = {}) {
    try {
      return await httpClient.get(API_ENDPOINTS.THONGKE.FEE_REPORT, {
        params: filters,
      });
    } catch (error) {
      console.error("Error fetching fee report:", error);
      throw error;
    }
  }

  /**
   * Get donation campaign report
   */
  async getDonationReport(filters = {}) {
    try {
      return await httpClient.get(API_ENDPOINTS.THONGKE.DONATION_REPORT, {
        params: filters,
      });
    } catch (error) {
      console.error("Error fetching donation report:", error);
      throw error;
    }
  }

  /**
   * Get population statistics
   */
  async getPopulationStats(filters = {}) {
    try {
      return await httpClient.get(API_ENDPOINTS.THONGKE.POPULATION_STATS, {
        params: filters,
      });
    } catch (error) {
      console.error("Error fetching population statistics:", error);
      throw error;
    }
  }

  /**
   * Get monthly fee collection summary
   */
  async getMonthlyFeeSummary(month, year) {
    try {
      return await httpClient.get(API_ENDPOINTS.THONGKE.FEE_REPORT, {
        params: { month, year },
      });
    } catch (error) {
      console.error("Error fetching monthly fee summary:", error);
      throw error;
    }
  }

  /**
   * Get annual statistics
   */
  async getAnnualStats(year) {
    try {
      return await httpClient.get(API_ENDPOINTS.THONGKE.FEE_REPORT, {
        params: { year },
      });
    } catch (error) {
      console.error("Error fetching annual statistics:", error);
      throw error;
    }
  }
}

export default new ThongKeService();
