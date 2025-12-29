import { API_CONFIG } from "./api.config";

/**
 * HTTP Client for making API requests
 * Handles request/response interceptors, error handling, and timeout
 */
class HttpClient {
  constructor(config = API_CONFIG) {
    this.baseURL = config.BASE_URL;
    this.timeout = config.TIMEOUT;
    this.defaultHeaders = config.HEADERS;
  }

  /**
   * Get the authorization token from localStorage
   */
  getAuthToken() {
    return localStorage.getItem("token");
  }

  /**
   * Set authorization token
   */
  setAuthToken(token) {
    localStorage.setItem("token", token);
  }

  /**
   * Clear authorization token
   */
  clearAuthToken() {
    localStorage.removeItem("token");
  }

  /**
   * Build headers with authentication
   */
  buildHeaders(customHeaders = {}) {
    const headers = {
      ...this.defaultHeaders,
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Make HTTP request
   */
  async request(method, url, options = {}) {
    let requestUrl = `${this.baseURL}${url}`;
    const requestOptions = {
      method,
      headers: this.buildHeaders(options.headers),
      signal: AbortSignal.timeout(this.timeout),
    };

    if (options.body) {
      requestOptions.body = JSON.stringify(options.body);
    }

    if (options.params) {
      const queryString = new URLSearchParams(options.params).toString();
      requestUrl += `?${queryString}`;
    }

    try {
      const response = await fetch(requestUrl, requestOptions);

      // Handle non-2xx responses
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        const errorData = contentType?.includes("application/json")
          ? await response.json().catch(() => ({}))
          : {};
        const error = new Error(errorData.message || `HTTP ${response.status}`);
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      // Try to parse JSON response
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      }

      return response;
    } catch (error) {
      // Handle specific error types
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }

      if (error instanceof SyntaxError) {
        throw new Error("Invalid JSON response from server");
      }

      throw error;
    }
  }

  /**
   * GET request
   */
  get(url, options = {}) {
    return this.request("GET", url, options);
  }

  /**
   * POST request
   */
  post(url, body, options = {}) {
    return this.request("POST", url, { ...options, body });
  }

  /**
   * PUT request
   */
  put(url, body, options = {}) {
    return this.request("PUT", url, { ...options, body });
  }

  /**
   * PATCH request
   */
  patch(url, body, options = {}) {
    return this.request("PATCH", url, { ...options, body });
  }

  /**
   * DELETE request
   */
  delete(url, options = {}) {
    return this.request("DELETE", url, options);
  }
}

// Create and export a singleton instance
export const httpClient = new HttpClient();

export default HttpClient;
