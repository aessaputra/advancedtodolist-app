import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  // Dialek database yang kita gunakan.
  dialect: 'sqlite',
  // Driver spesifik untuk Expo SQLite.
  driver: 'expo',
  // Lokasi file skema database kita.
  schema: './src/db/schema.ts',
  // Folder output untuk menyimpan file migrasi yang dihasilkan.
  out: './src/db/migrations',
});
