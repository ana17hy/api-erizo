const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Crear erizo (POST)
app.post("/hedgehogs", (req, res) => {
  const { name, color, age, favorite_food } = req.body;
  const sql =
    "INSERT INTO hedgehogs (name, color, age, favorite_food) VALUES (?, ?, ?, ?)";
  const params = [name, color, age, favorite_food];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, name, color, age, favorite_food });
  });
});

// Leer todos los erizos (GET)
app.get("/hedgehogs", (req, res) => {
  const sql = "SELECT * FROM hedgehogs";
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Leer un erizo (GET)
app.get("/hedgehog/:id", (req, res) => {
  const sql = "SELECT * FROM hedgehogs WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(row);
  });
});

// Modificar erizo (PUT)
app.put("/hedgehog/:id", (req, res) => {
  const { name, color, age, favorite_food } = req.body;
  const sql =
    "UPDATE hedgehogs SET name=?, color=?, age=?, favorite_food=? WHERE id=?";
  const params = [name, color, age, favorite_food, req.params.id];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ updatedID: req.params.id, name, color, age, favorite_food });
  });
});

// Eliminar erizo (DELETE)
app.delete("/hedgehog/:id", (req, res) => {
  const sql = "DELETE FROM hedgehogs WHERE id=?";
  db.run(sql, [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deletedID: req.params.id });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API de erizos corriendo en http://localhost:${PORT}`);
});
