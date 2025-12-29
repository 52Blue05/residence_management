/**
 * Service Layer Exports
 * Central point for importing all API services
 */

// HTTP Client
export { httpClient, default as HttpClient } from "./http.client";

// API Configuration
export { default as API_CONFIG, API_ENDPOINTS } from "./api.config";

// Service Classes
export { default as authService } from "./auth.service";
export { default as taiKhoanService } from "./taikhoan.service";
export { default as nhanKhauService } from "./nhankhau.service";
export { default as tamTruService } from "./tamtru.service";
export { default as loaiPhiService } from "./loaiphi.service";
export { default as dotThuService } from "./dotthu.service";
export { default as thuPhiService } from "./thuphi.service";
export { default as phiVeSinhService } from "./phivesingh.service";
export { default as dongGopService } from "./donggop.service";
export { default as thongKeService } from "./thongke.service";

// Error Handling
export * from "./error.handler";

// Convenience re-exports
export * from "./api.config";
