import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite/next';
import * as schema from './schema';

// Membuka atau membuat file database bernama 'db.db'
const expoDb = openDatabaseSync('db.db');

// Menghubungkan Drizzle ORM dengan database yang baru saja dibuka,
// dan memberitahunya untuk menggunakan skema yang telah kita definisikan.
export const db = drizzle(expoDb, { schema });
