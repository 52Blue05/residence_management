import { httpClient } from "./http.client";

/**
 * Service for managing households (Hộ khẩu)
 */
export const householdService = {
  // Get all households
  getAllHouseholds: async () => {
    try {
      return await httpClient.get("/nhankhau");
    } catch (error) {
      console.error("Error fetching households:", error);
      throw error;
    }
  },

  // Get household by soHoKhau
  getHouseholdByNumber: async (soHoKhau) => {
    try {
      return await httpClient.get(`/nhankhau/ho-khau/${soHoKhau}`);
    } catch (error) {
      console.error(`Error fetching household ${soHoKhau}:`, error);
      throw error;
    }
  },

  // Get members of a household
  getHouseholdMembers: async (soHoKhau) => {
    try {
      return await httpClient.get(`/nhankhau/ho-khau/${soHoKhau}`);
    } catch (error) {
      console.error(`Error fetching members for household ${soHoKhau}:`, error);
      throw error;
    }
  },

  // Get history of a household
  getHouseholdHistory: async (soHoKhau) => {
    try {
      return await httpClient.get(`/nhankhau/lich-su-ho-khau/${soHoKhau}`);
    } catch (error) {
      console.error(`Error fetching household history ${soHoKhau}:`, error);
      throw error;
    }
  },
};

export default householdService;
