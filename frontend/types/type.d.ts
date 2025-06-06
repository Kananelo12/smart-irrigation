import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface WeatherData {
  temperature: number;
  weatherDescription: string;
  humidity?: number;
  windSpeed?: number;
  precipitation?: number;
  currentTime: number;
  sunrise: number;
  sunset: number;
}

declare interface SensorData {
  timestamp: string;
  humidity: number;
  moisture: number;
  temperature: number;
}

declare interface Crop {
  id: number;
  name: string;
  waterRequirement: number;
  temperatureRequirement: number;
  humidityRequirement: number;
  moistureRequirement: number;
}
