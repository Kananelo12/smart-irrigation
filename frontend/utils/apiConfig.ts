// // apiConfig.js
// import Zeroconf from "react-native-zeroconf";

// const zeroconf = new Zeroconf();

// export const discoverApiBaseUrl = () => {
//   return new Promise((resolve, reject) => {
//     // …to something like:
//     let timeoutId: ReturnType<typeof setTimeout>;

//     const onResolved = (service: any) => {
//       clearTimeout(timeoutId);
//       zeroconf.removeListener("resolved", onResolved);
//       zeroconf.removeListener("error", onError);

//       const ip = service.addresses[0];
//       const port = service.port;
//       resolve(`http://${ip}:${port}`);
//     };

//     const onError = (err: any) => {
//       clearTimeout(timeoutId);
//       zeroconf.removeListener("resolved", onResolved);
//       zeroconf.removeListener("error", onError);
//       console.error("Zeroconf error:", err);
//       reject(err);
//     };

//     zeroconf.on("resolved", onResolved);
//     zeroconf.on("error", onError);

//     // Give it up to 5s to find the service
//     timeoutId = setTimeout(() => {
//       zeroconf.removeListener("resolved", onResolved);
//       zeroconf.removeListener("error", onError);
//       reject(new Error("Zeroconf discovery timed out"));
//     }, 5000);

//     zeroconf.scan("http", "tcp", "local.");
//   });
// };
