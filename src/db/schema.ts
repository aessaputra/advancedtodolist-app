import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Ini adalah skema untuk tabel 'todos' kita.
 * Setiap properti di sini mewakili sebuah kolom di dalam tabel database.
 */
export const todos = sqliteTable("todos", {
  // Kolom 'id': Angka unik untuk setiap tugas, akan bertambah otomatis.
  id: integer("id").primaryKey({ autoIncrement: true }),
  
  // Kolom 'content': Teks dari tugas yang harus dilakukan. Tidak boleh kosong.
  content: text("content").notNull(),
  
  // Kolom 'completed': Status tugas, 0 untuk belum selesai, 1 untuk selesai.
  // Kita gunakan mode boolean agar lebih mudah dibaca di kode kita (true/false).
  // Default-nya adalah false (belum selesai).
  completed: integer("completed", { mode: "boolean" }).default(false).notNull(),
});