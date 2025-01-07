import { Schema } from '../../data/resource';

const WEATHER_TYPES = [
  { value: 1, unit: '☀️ 晴れ' },
  { value: 2, unit: '🌤️ 晴れ時々曇り' },
  { value: 3, unit: '☁️ 曇り' },
  { value: 4, unit: '🌧️ 雨' },
  { value: 5, unit: '⛈️ 雷雨' },
  { value: 6, unit: '❄️ 雪' },
] as const;

interface WeatherInfo {
  value: number;
  unit: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
}

export const handler: Schema['getWeather']['functionHandler'] =
  async (event) => {
    const { city } = event.arguments;
    if (!city) {
      throw new Error('City is required');
    }

    const randomIndex = Math.floor(
      Math.random() * WEATHER_TYPES.length
    );
    const weather = WEATHER_TYPES[randomIndex];

    const weatherInfo: WeatherInfo = {
      ...weather,
      temperature:
        Math.floor(Math.random() * 35) + 5, // 5℃～40℃
      humidity:
        Math.floor(Math.random() * 60) + 40, // 40%～100%
      pressure:
        Math.floor(Math.random() * 20) + 990, // 990hPa～1010hPa
      windSpeed: Math.floor(Math.random() * 20), // 0m/s～20m/s
      description: `${city}の天気: ${weather.unit}`,
    };

    return weatherInfo;
  };
