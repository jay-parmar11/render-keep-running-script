const http = require('http');
const https = require('https'); // Or 'http' for non-https URLs

// Get all URLs from command line arguments, starting from index 2
const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.error('Please provide at least one URL as a command-line argument.');
  process.exit(1);
}

// Get the port from environment variables or default to 4000
const port = process.env.PORT || 10000;

// Create a simple server that responds with "204 No Content"
const server = http.createServer((req, res) => {
  res.end(); // No content, just close the connection
});

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to make a request to a specific URL
function makeRequest(url) {
  https.get(url, (res) => {
    console.log(`Request sent to ${url}. Status Code: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`Error for ${url}: ${err.message}`);
  });
}

// Function to set an interval for a specific URL
function scheduleNextRequest(url) {
  // const randomInterval = Math.floor(Math.random() * (4 - 2 + 1) + 2) * 60 * 1000; // Random between 2-4 minutes
  const randomInterval = 1000 * 60;
  console.log(`Next request to ${url} in ${randomInterval / 1000 / 60} minutes.`);
  
  setTimeout(() => {
    makeRequest(url);
    scheduleNextRequest(url); // Schedule next request for this URL
  }, randomInterval);
}

// Start the request loop for each URL
urls.forEach(url => scheduleNextRequest(url));
