import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('tarefas.db');

export function initDb() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        atividade TEXT NOT NULL,
        categoria TEXT NOT NULL
    );
  `);
}