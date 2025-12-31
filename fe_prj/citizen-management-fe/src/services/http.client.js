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

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const token = this.getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const requestOptions = {
      method,
      headers,
      mode: "cors",
      credentials: "include",
    };

    if (options.body) {
      requestOptions.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(requestUrl, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const err = new Error(errorData.message || "Request failed");
        err.data = errorData;
        err.status = response.status;
        throw err;
      }

      return await response.json();
    } catch (err) {
      throw err;
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
