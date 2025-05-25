// apiConfig.js
import Zeroconf from "react-native-zeroconf";
console.log("Zeroconf initialized");
const zeroconf = new Zeroconf();
console.log("Zeroconf instance created", zeroconf);

// Replace with your ngrok URL from Step 1:
const NGROK_URL = "https://0622-197-189-137-192.ngrok-free.app";
console.log("\n\nNgrok URL set:", NGROK_URL);

let cachedUrl: unknown = null;

/**
 * Attempts to discover the Spring Boot service via mDNS,
 * falling back to ngrok after 3 seconds.
 * @returns {Promise<string>} baseUrl, e.g. "http://192.168.1.10:8080" or the ngrok URL
 */
export async function discoverApiBaseUrl() {
  if (cachedUrl) {
    return cachedUrl;
  }

  console.log("BEFORE PROMISE IN APICONFIG");
  return new Promise((resolve) => {
    console.log("AFTER PROMISE IN APICONFIG");
    // Fallback timer:
    const fallback = setTimeout(() => {
      console.log("INSIDE CALLBACK");
      zeroconf.stop(); // stop scanning
      cachedUrl = NGROK_URL;
      console.warn("⚠️  mDNS timeout — falling back to ngrok:", NGROK_URL);
      resolve(cachedUrl);
    }, 3000);

    // Listen for service resolution:
    zeroconf.on("resolved", (service) => {
      clearTimeout(fallback);
      const ip = service.addresses[0];
      const port = service.port;
      cachedUrl = `http://${ip}:${port}`;
      console.log("✅ Discovered backend via mDNS:", cachedUrl);
      zeroconf.stop();
      resolve(cachedUrl);
    });

    // Begin scanning for your service type:
    zeroconf.scan("http", "tcp", "local.");
  });
}
