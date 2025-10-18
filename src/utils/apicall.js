// apiUtils.js
const baseUrl =
  'http://ec2-13-60-34-131.eu-north-1.compute.amazonaws.com:4002/v1';

export const apiCall = async (
  method,
  endpoint,
  data = null,
  queryParams = null,
  useAuth = true,
  token,
  deviceType = null, // New optional param
  deviceToken = null, // New optional param
) => {
  let url = baseUrl + endpoint;

  // Add query parameters for GET requests
  if (queryParams && method === 'GET') {
    const query = new URLSearchParams(queryParams).toString();
    url += `?${query}`;
  }

  // Headers with conditional Authorization and optional device headers
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (useAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (deviceType) {
    headers['device-type'] = deviceType;
  }

  if (deviceToken) {
    headers['device-token'] = deviceToken;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: method === 'GET' ? null : JSON.stringify(data),
    });

    console.log('API request of --->', endpoint, ' ===>', JSON.stringify(data));

    if (!response.ok) {
      console.log(JSON.stringify(response));
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(
      'API response of --->',
      endpoint,
      ' ===>',
      JSON.stringify(responseData),
    );
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
