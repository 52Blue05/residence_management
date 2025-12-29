// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  // Account (Tài Khoản)
  TAIKHOAN: {
    GET_ALL: "/taikhoan",
    GET_BY_ID: (id) => `/taikhoan/${id}`,
    CREATE: "/taikhoan",
    UPDATE: (id) => `/taikhoan/${id}`,
    DELETE: (id) => `/taikhoan/${id}`,
  },

  // Residents (Nhân Khẩu)
  NHANKHAU: {
    GET_ALL: "/nhankhau",
    GET_BY_ID: (id) => `/nhankhau/${id}`,
    CREATE: "/nhankhau/them-moi",
    UPDATE: "/nhankhau/thay-doi",
    DELETE: (id) => `/nhankhau/${id}`,
    CHANGE_HEAD: "/nhankhau/thay-doi-chu-ho",
    GET_BY_HOUSEHOLD: (hoKhauId) => `/nhankhau/ho-khau/${hoKhauId}`,
  },

  // Temporary Residents (Tạm Trú)
  TAMTRU: {
    GET_ALL: "/tamtru",
    GET_BY_ID: (id) => `/tamtru/${id}`,
    CREATE: "/tamtru",
    UPDATE: (id) => `/tamtru/${id}`,
    DELETE: (id) => `/tamtru/${id}`,
  },

  // Fee Types (Loại Phí)
  LOAIPHI: {
    GET_ALL: "/loaiphi",
    GET_BY_ID: (id) => `/loaiphi/${id}`,
    CREATE: "/loaiphi",
    UPDATE: (id) => `/loaiphi/${id}`,
    DELETE: (id) => `/loaiphi/${id}`,
  },

  // Collection Periods (Đợt Thu)
  DOTTHU: {
    GET_ALL: "/dotthu",
    GET_BY_ID: (id) => `/dotthu/${id}`,
    CREATE: "/dotthu",
    UPDATE: (id) => `/dotthu/${id}`,
    DELETE: (id) => `/dotthu/${id}`,
  },

  // Fee Collection (Thu Phí)
  THUPHI: {
    GET_ALL: "/thuphi",
    GET_BY_ID: (id) => `/thuphi/${id}`,
    CREATE: "/thuphi",
    UPDATE: (id) => `/thuphi/${id}`,
    DELETE: (id) => `/thuphi/${id}`,
    GET_BY_HOUSEHOLD: (hoKhauId) => `/thuphi/ho-khau/${hoKhauId}`,
  },

  // Sanitation Fee (Phí Vệ Sinh)
  PHIVESINGH: {
    GET_ALL: "/phivesingh",
    GET_BY_ID: (id) => `/phivesingh/${id}`,
    CREATE: "/phivesingh",
    UPDATE: (id) => `/phivesingh/${id}`,
    DELETE: (id) => `/phivesingh/${id}`,
  },

  // Donation (Đóng Góp)
  DONGGOP: {
    GET_ALL: "/donggop",
    GET_BY_ID: (id) => `/donggop/${id}`,
    CREATE: "/donggop",
    UPDATE: (id) => `/donggop/${id}`,
    DELETE: (id) => `/donggop/${id}`,
  },

  // Reports (Thống Kê)
  THONGKE: {
    FEE_REPORT: "/thongke/thuphi",
    DONATION_REPORT: "/thongke/donggop",
    POPULATION_STATS: "/thongke/nhankhau",
  },
};

export default API_CONFIG;
