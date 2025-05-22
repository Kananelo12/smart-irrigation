// apiConfig.js
import Zeroconf from 'react-native-zeroconf';

const zeroconf = new Zeroconf();
let apiBaseUrl = null;

export const discoverApiBaseUrl = () => {
  return new Promise((resolve, reject) => {
    zeroconf.on('resolved', service => {
      const ip = service.addresses[0];
      const port = service.port;
      apiBaseUrl = `http://${ip}:${port}`;
      resolve(apiBaseUrl);
    });

    zeroconf.on('error', err => {
      console.error('Zeroconf error:', err);
      reject(err);
    });

    zeroconf.scan('http', 'tcp', 'local.');
  });
};

export const getApiBaseUrl = () => apiBaseUrl;
