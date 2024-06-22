const axios = require('axios');
require('dotenv').config();

const generateImage = async (description, service = 'stability') => {
  let apiUrl, apiKey;

  if (service === 'openai') {
    apiUrl = 'https://api.openai.com/v1/images/generations';
    apiKey = process.env.OPENAI_API_KEY;
  } else {
    apiUrl = 'https://api.stability.ai/v2beta/stable-diffusion';
    apiKey = process.env.STABILITY_API_KEY;
  }

  try {
    const response = await axios.post(apiUrl, { description }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

module.exports = { generateImage };
