export interface GeocodeResult {
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
  address?: { city?: string; country?: string; state?: string };
}

export interface WeatherData {
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  weather: Array<{ main: string; description: string; icon: string }>;
  name: string;
  dt: number;
  sys?: { country?: string };
}

export interface AirQualityData {
  list?: Array<{
    main: { aqi: number };
    components?: {
      pm2_5?: number;
      pm10?: number;
      o3?: number;
      no2?: number;
      so2?: number;
      co?: number;
    };
  }>;
  data?: {
    aqi?: number;
    iaqi?: Record<string, { v?: number }>;
  };
}

export interface HistoricalDay {
  date: string;
  temp_max: number;
  temp_min: number;
  temp_avg?: number;
}

export interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  precipitation_sum?: number;
  uv_index_max?: number;
  weather_code?: number;
}
