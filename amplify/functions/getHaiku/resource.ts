import { defineFunction } from '@aws-amplify/backend';

export const getHaiku = defineFunction({
  name: 'getHaiku',
  entry: './handler.ts',
});
