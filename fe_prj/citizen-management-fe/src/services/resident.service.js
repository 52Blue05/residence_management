import { httpClient } from "./http.client";

/**
 * Service for managing residents (Nhân khẩu)
 */
export const residentService = {
  // Get all residents
  getAllResidents: async () => {
    try {
      return await httpClient.get("/nhankhau");
    } catch (error) {
      console.error("Error fetching residents:", error);
      throw error;
    }
  },

  // Get residents by household (soHoKhau)
  getResidentsByHousehold: async (soHoKhau) => {
    try {
      return await httpClient.get(`/nhankhau/ho-khau/${soHoKhau}`);
    } catch (error) {
      console.error(
        `Error fetching residents for household ${soHoKhau}:`,
        error
      );
      throw error;
    }
  },

  // Get history of a resident
  getResidentHistory: async (soHoKhau) => {
    try {
      return await httpClient.get(`/nhankhau/lich-su-nhan-khau/${soHoKhau}`);
    } catch (error) {
      console.error(`Error fetching resident history ${soHoKhau}:`, error);
      throw error;
    }
  },

  // Add new resident (trẻ mới sinh)
  addNewResident: async (data) => {
    try {
      return await httpClient.post("/nhankhau/them-moi", data);
    } catch (error) {
      console.error("Error adding new resident:", error);
      throw error;
    }
  },

  // Update resident information
  updateResident: async (data) => {
    try {
      return await httpClient.put("/nhankhau/thay-doi", data);
    } catch (error) {
      console.error("Error updating resident:", error);
      throw error;
    }
  },

  // Search residents by household head
  searchByHouseholdHead: async () => {
    try {
      return await httpClient.get("/nhankhau/search-chu-ho");
    } catch (error) {
      console.error("Error searching household head:", error);
      throw error;
    }
  },
};

export default residentService;
