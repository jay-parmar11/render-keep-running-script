const https = require("https"); // Or 'http' for non-https URLs

// Get URL from command line arguments
const url = process.argv[2];

if (!url) {
  console.error("Please provide a URL as a command-line argument.");
  process.exit(1);
}

// Function to make a request
function makeRequest() {
  https
    .get(
      url
      // ,
      //  (res) => {
      // console.log(`Request sent. Status Code: ${res.statusCode}`);
      //   }
    )
    .on("error", (err) => {
      console.error(`Error: ${err.message}`);
    });
}

// Function to set an interval between 2 to 4 minutes
function scheduleNextRequest() {
  const randomInterval = Math.floor(Math.random() * (4 - 2 + 1) + 2) * 60 * 1000; // Random between 2-4 minutes
  console.log(`Next request in ${randomInterval / 1000 / 60} minutes.`);

  setTimeout(() => {
    makeRequest();
    scheduleNextRequest(); // Schedule next request after the current one
  }, randomInterval);
}

// Start the request loop
scheduleNextRequest();
