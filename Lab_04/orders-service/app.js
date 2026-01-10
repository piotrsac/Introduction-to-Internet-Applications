const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require('jsonwebtoken');
const { sequelize, Order } = require("./Order");

const app = express();
const PORT = 3002;
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

app.get("/api/orders/:userId", async (req, res) => {
  const userId = req.params.userId;
  const orders = await Order.findAll({ where: { userId: userId } });
  res.json(orders);
});

app.post("/api/orders", authenticateToken, async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    await axios.get(`http://localhost:3001/api/books/${bookId}`);
    const newOrder = await Order.create({ userId, bookId, quantity });
    res.status(201).json({ id: newOrder.id });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "That book doesnt exist" });
    } else {
      res.status(500).json({ error: "Server Error" });
    }
  }
});

app.delete("/api/orders/:orderId", authenticateToken, async (req, res) => {
  const order = await Order.findByPk(req.params.orderId);
  if (order) {
    await order.destroy();
    res.json({ message: "Deleted" });
  } else {
    res.status(404).json({ message: "That order could't be found" });
  }
});

app.patch("/api/orders/:orderId", authenticateToken, async (req, res) => {
  const order = await Order.findByPk(req.params.orderId);
  if (order) {
    const { quantity } = req.body;
    if (quantity) order.quantity = quantity;
    await order.save();
    res.json(order);
  } else {
    res.status(404).json({ message: "That order could't be found" });
  }
});

sequelize.sync().then(() => {
  console.log("Orders DB is ready!");
  app.listen(PORT, () => {
    console.log(`Order service is running on http://localhost:${PORT}`);
  });
});
