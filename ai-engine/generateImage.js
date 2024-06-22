const axios = require('axios');
require('dotenv').config();

const generateImage = async (description, service = 'unsplash') => {
  let apiUrl, apiKey, params, headers;

  if (service === 'unsplash') {
    apiUrl = 'https://api.unsplash.com/search/photos';
    apiKey = process.env.UNSPLASH_ACCESS_KEY;
    params = {
      query: description,
      per_page: 1
    };
    headers = {
      Authorization: `Client-ID ${apiKey}`
    };
  } else if (service === 'pexels') {
    apiUrl = 'https://api.pexels.com/v1/search';
    apiKey = process.env.PEXELS_API_KEY;
    params = {
      query: description,
      per_page: 1
    };
    headers = {
      Authorization: apiKey
    };
  }

  try {
    console.log(`Sending request to ${service} API with description: ${description}`);
    const response = await axios.get(apiUrl, { params, headers });

    console.log('Received response from API:', response.data);
    if (service === 'unsplash') {
      return response.data.results[0].urls.full;
    } else if (service === 'pexels') {
      return response.data.photos[0].src.original;
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

module.exports = { generateImage };
