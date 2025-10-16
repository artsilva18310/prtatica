import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('tarefas.db');

export function initDb() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT (100),
        genero TEXT (100),
        ano INTEGER (100)
    );
`);
}