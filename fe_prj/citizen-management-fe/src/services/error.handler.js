/**
 * API Error Handler
 * Provides utilities for handling and transforming API errors
 */

export class ApiError extends Error {
  constructor(message, status = null, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Transform API error response
 */
export const transformError = (error) => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof TypeError) {
    if (error.message.includes("fetch")) {
      return new ApiError("Không thể kết nối đến server", null, error);
    }
    return new ApiError("Lỗi mạng", null, error);
  }

  if (error.status) {
    const message = getErrorMessage(error.status, error.data);
    return new ApiError(message, error.status, error.data);
  }

  return new ApiError(error.message || "Đã xảy ra lỗi", null, error);
};

/**
 * Get human-readable error message based on status code
 */
export const getErrorMessage = (status, data) => {
  const messages = {
    400: data?.message || "Yêu cầu không hợp lệ",
    401: "Vui lòng đăng nhập lại",
    403: "Bạn không có quyền thực hiện hành động này",
    404: "Không tìm thấy dữ liệu",
    409: "Dữ liệu đã tồn tại hoặc bị xung đột",
    422: data?.message || "Dữ liệu không hợp lệ",
    429: "Quá nhiều yêu cầu. Vui lòng chờ",
    500: "Lỗi máy chủ. Vui lòng thử lại sau",
    502: "Máy chủ tạm thời không khả dụng",
    503: "Dịch vụ tạm thời không khả dụng",
    504: "Kết nối đến máy chủ bị hết thời gian chờ",
  };

  return (
    messages[status] || `Lỗi ${status}: ${data?.message || "Đã xảy ra lỗi"}`
  );
};

/**
 * Retry API request with exponential backoff
 */
export const retryRequest = async (
  apiFunction,
  maxRetries = 3,
  backoffMultiplier = 2
) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiFunction();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors
      if (error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Wait before retrying
      if (i < maxRetries - 1) {
        const delay = Math.pow(backoffMultiplier, i) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
};

export default {
  ApiError,
  transformError,
  getErrorMessage,
  retryRequest,
};
