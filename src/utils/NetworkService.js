class NetworkService {
  // Default headers for requests
  static defaultHeaders = {
    'Content-Type': 'application/json',
  };

  /**
   * Makes a GET request with optional query parameters and an authorization token
   * @param {string} url - The URL to fetch
   * @param {Object} params - Query parameters to append to the URL
   * @param {string} authToken - Authorization token to be sent in the request headers
   * @returns {Promise<Object>} - The JSON response
   */
  static async get(url, params = {}, authToken = '') {
    try {
      // Add query parameters to the URL if any
      const query = new URLSearchParams(params).toString();
      const fullUrl = query ? `${url}?${query}` : url;

      // Set headers including the Authorization token if provided
      const headers = {
        ...NetworkService.defaultHeaders,
        ...(authToken && {Authorization: `Bearer ${authToken}`}), // Conditionally add Authorization header
      };

      // Perform the GET request
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: headers,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  }

  /**
   * Helper function to handle response and parse JSON
   * @param {Response} response - The response object
   * @returns {Promise<Object>} - The parsed JSON response
   */
  static async handleResponse(response) {
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorMessage}`);
    }

    return await response.json();
  }
}

export default NetworkService;
