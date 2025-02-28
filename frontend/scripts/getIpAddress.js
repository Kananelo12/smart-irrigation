const os = require('os');
const fs = require('fs');
const path = '.env';

// Function to get your local IP address
function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const ip = getLocalIp();
const newApiUrl = `API_URL=http://${ip}:8080`;

// Read existing .env file if it exists
let envVars = {};
if (fs.existsSync(path)) {
  const fileContent = fs.readFileSync(path, 'utf8');
  fileContent.split('\n').forEach(line => {
    if (line.trim() && line.includes('=')) {
      const [key, value] = line.split('=');
      envVars[key] = value;
    }
  });
}

// Update or add the API_URL variable
envVars.API_URL = `http://${ip}:8080`;

// Rebuild the content for the .env file
const updatedContent = Object.entries(envVars)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n') + '\n';

// Write the updated content back to .env
fs.writeFileSync(path, updatedContent);
console.log(`Updated .env with IP: ${ip}`);
