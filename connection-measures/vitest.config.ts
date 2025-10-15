/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import {svelte} from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [
      svelte({
        extensions: ['.svelte', '.svelte.ts'],
  })],
  test: {
      globals: true,
     include: ['**/*.spec.ts'],
     includeSource: ['**/*.ts'],
  },
});
