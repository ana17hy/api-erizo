const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./hedgehogs.db", (err) => {
  if (err) {
    console.error("Error al abrir la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite de erizos.");

    db.run(
      `CREATE TABLE IF NOT EXISTS hedgehogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT,
        age INTEGER,
        favorite_food TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Error al crear la tabla:", err.message);
        } else {
          console.log("Tabla 'hedgehogs' lista.");
        }
      }
    );
  }
});

module.exports = db;
