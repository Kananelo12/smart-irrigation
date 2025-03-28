import icons from "./icons";
import images from "./images";

// Farm Listings
export const farms = [
  {
    name: "Green Valley Farm",
    location: "Location A",
    size: "50 acres",
    soilType: "Loamy",
    irrigation: "Drip Irrigation",
    image: images.farmerPic,
  },
  {
    name: "Sunrise Farm",
    location: "Location B",
    size: "30 acres",
    soilType: "Clay",
    irrigation: "Sprinkler",
    image: images.farmerPic,
  },
];
// Crops Data
export const crops = [
  {
    id: "1",
    name: "Cabbage",
    landUsed: "12 meters",
    period: "Feb - Jun",
    icon: require("../assets/icons/crop.png"),
    deleteIcon: icons.deleteIcon,

  },
  {
    id: "2",
    name: "Tomatoes",
    landUsed: "100 meters",
    period: "Feb - Jun",
    icon: require("../assets/icons/crop.png"),
    deleteIcon: icons.deleteIcon,
  },
  {
    id: "3",
    name: "Spinach",
    landUsed: "20 meters",
    period: "Feb - Jun",
    icon: require("../assets/icons/crop.png"),
    deleteIcon: icons.deleteIcon,
  },
];

export const notifications = [
  {
    id: "1",
    title: "Sensors Detected Heat",
    description: "High temperature detected in the field. Consider increasing irrigation.",
    time: "Now",
    category: "Today",
  },
  {
    id: "2",
    title: "Rain Detected",
    description: "Rainfall detected in the area. Irrigation postponed.",
    time: "Now",
    category: "Today",
  },
  {
    id: "3",
    title: "Soil Moisture Low",
    description: "Soil moisture levels are below the optimal range. Irrigation initiated.",
    time: "12:14 PM",
    category: "Yesterday",
  },
  {
    id: "4",
    title: "Pump Malfunction Alert",
    description: "An issue detected with the water pump. Check system status.",
    time: "18:00 PM",
    category: "Last week",
  },
  {
    id: "5",
    title: "Irrigation System Activated",
    description: "Irrigation system started automatically.",
    time: "9:41 AM",
    category: "Last week",
  },
];

// Featured Crops
export const featuredCrops = [
  {
    name: "Tomatoes",
    growthStage: "Flowering",
    waterRequirement: "Medium",
    temperature: "20°C - 30°C",
    image: images.farmerPic,
  },
  {
    name: "Cabbage",
    growthStage: "Harvest",
    waterRequirement: "High",
    temperature: "15°C - 25°C",
    image: images.farmerPic,
  },
];

// Crop Categories
export const categories = [
  { title: "All Crops", category: "All" },
  { title: "Vegetables", category: "Vegetables" },
  { title: "Fruits", category: "Fruits" },
  { title: "Grains", category: "Grains" },
  { title: "Herbs", category: "Herbs" },
];

// Settings
export const settings = [
  { title: "My Farm", icon: icons.search },
  { title: "Notifications", icon: icons.bell },
  { title: "Weather Alerts", icon: icons.search },
  { title: "Security", icon: icons.search },
  { title: "Language", icon: icons.search },
  { title: "Help Center", icon: icons.search },
];

// Farm Facilities
export const facilities = [
  { title: "Irrigation System", icon: icons.search },
  { title: "Fertilizer Storage", icon: icons.search },
  { title: "Greenhouse", icon: icons.search },
  { title: "Weather Monitoring", icon: icons.search },
];

// Farm Gallery
export const gallery = [
  { id: 1, image: images.farmerPic },
  { id: 2, image: images.farmerPic },
  { id: 3, image: images.farmerPic },
  { id: 4, image: images.farmerPic },
];

// FIXME: actual structure data:
// import icons from "./icons";
// import images from "./images";

// Farm Listings
// export const farms = [
//   {
//     name: "Green Valley Farm",
//     location: "Location A",
//     size: "50 acres",
//     soilType: "Loamy",
//     irrigation: "Drip Irrigation",
//     image: images.farm1,
//   },
//   {
//     name: "Sunrise Farm",
//     location: "Location B",
//     size: "30 acres",
//     soilType: "Clay",
//     irrigation: "Sprinkler",
//     image: images.farm2,
//   },
// ];

// // Featured Crops
// export const featuredCrops = [
//   {
//     name: "Tomatoes",
//     growthStage: "Flowering",
//     waterRequirement: "Medium",
//     temperature: "20°C - 30°C",
//     image: images.tomatoes,
//   },
//   {
//     name: "Cabbage",
//     growthStage: "Harvest",
//     waterRequirement: "High",
//     temperature: "15°C - 25°C",
//     image: images.cabbage,
//   },
// ];

// // Crop Categories
// export const categories = [
//   { title: "All Crops", category: "All" },
//   { title: "Vegetables", category: "Vegetables" },
//   { title: "Fruits", category: "Fruits" },
//   { title: "Grains", category: "Grains" },
//   { title: "Herbs", category: "Herbs" },
// ];

// // Settings
// export const settings = [
//   { title: "My Farm", icon: icons.farm },
//   { title: "Notifications", icon: icons.bell },
//   { title: "Weather Alerts", icon: icons.weather },
//   { title: "Security", icon: icons.shield },
//   { title: "Language", icon: icons.language },
//   { title: "Help Center", icon: icons.info },
// ];

// // Farm Facilities
// export const facilities = [
//   { title: "Irrigation System", icon: icons.water },
//   { title: "Fertilizer Storage", icon: icons.storage },
//   { title: "Greenhouse", icon: icons.greenhouse },
//   { title: "Weather Monitoring", icon: icons.weather },
// ];

// // Farm Gallery
// export const gallery = [
//   { id: 1, image: images.farm1 },
//   { id: 2, image: images.farm2 },
//   { id: 3, image: images.tomatoes },
//   { id: 4, image: images.cabbage },
// ];
