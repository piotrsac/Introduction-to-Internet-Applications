const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { sequelize, Book } = require("./book");

const app = express();
const PORT = 3001;
const SECRET_KEY = "bardzo_tajny_klucz_do_podpisywania_tokenow";

app.use(express.json());
app.use(cors());

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/api/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

app.get("/api/books/:bookId", async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "That book could't be found" });
  }
});

app.post("/api/books", authenticateToken, async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({ id: newBook.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/books/:bookId", authenticateToken, async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);
  if (book) {
    await book.destroy();
    res.json({ message: "Deleted" });
  } else {
    res.status(404).json({ message: "That book could't be found" });
  }
});

sequelize.sync().then(() => {
  console.log("Books DB is ready!");
  app.listen(PORT, () => {
    console.log(`Book service is running on http://localhost:${PORT}`);
  });
});
