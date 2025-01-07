import { defineFunction } from '@aws-amplify/backend';

export const getWeather = defineFunction({
  name: 'getWeather',
  entry: './handler.ts',
});
