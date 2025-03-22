import * as Location from "expo-location";

/**
 * Request permission to access the device's location and fetches the current coordinates.
 * @returns An object with latitude and longitude.
 * @throws An error if location permission is denied or if location services are disabled.
*/

export async function getDeviceCoordinates(): Promise<Location.LocationObjectCoords> {
    // Reuqest permission to access the device's location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        throw new Error("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync({});
    return location.coords;
}