const https = require('https'); // Use https for secure requests by default
const http = require('http');

function get(url, options = {}) {
  return new Promise((resolve, reject) => {
    const request = (url.startsWith('https:') ? https : http).get(url, options, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Request failed with status code: ${response.statusCode}`));
        }
      });
      response.on('error', (error) => {
        reject(error);
      });
    });
    request.on('error', (error) => {
      reject(error);
    });
  });
}

function post(url, data, options = {}) {
  // Implement POST request logic with data handling and appropriate headers
  // ...
}

// ... Add support for other HTTP methods like PUT, DELETE if needed ...

module.exports = {
  get,
  post,
  // ... Add more functions as exports ...
};
