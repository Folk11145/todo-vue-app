const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");
const app = express();   // ประกาศ app ก่อน


app.use(cors());                // ใช้ CORS
app.use(express.json());        // อ่าน JSON body

const PORT = process.env.PORT || 3000;

// เชื่อม Database
const db = new sqlite3.Database(path.resolve(__dirname, "todos.db"), (err) => {
  if (err) console.error(err.message);
  else console.log("✅ Connected to SQLite database");
});

// API: ดึง todos ทั้งหมด
app.get("/api/todos", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API: เพิ่ม todo
app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  db.run("INSERT INTO todos (title) VALUES (?)", [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, completed: 0 });
  });
});

// ลบ todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// update completed
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.run("UPDATE todos SET completed = ? WHERE id = ?", [completed, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// หน้าเว็บทดสอบ server
app.get("/", (req, res) => {
  res.send("🚀 Todo API Server is running!");
});

// เริ่ม server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
