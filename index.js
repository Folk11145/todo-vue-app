const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");
const app = express();   


app.use(cors());                
app.use(express.json());        

const PORT = process.env.PORT || 3000;


const db = new sqlite3.Database(path.resolve(__dirname, "todos.db"), (err) => {
  if (err) console.error(err.message);
  else console.log("✅ Connected to SQLite database");
});


app.get("/api/todos", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  db.run("INSERT INTO todos (title) VALUES (?)", [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, completed: 0 });
  });
});


app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});


app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.run("UPDATE todos SET completed = ? WHERE id = ?", [completed, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});


app.get("/", (req, res) => {
  res.send("🚀 Todo API Server is running!");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
