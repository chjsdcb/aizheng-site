import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://aizheng.tech',
  output: 'static',
  build: {
    // /zh/ -> /zh/index.html
    format: 'directory',
  },
});
