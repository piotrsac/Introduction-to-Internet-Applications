const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelize, User } = require("./User");

const app = express();
const PORT = 3003;
const SECRET_KEY = "bardzo_tajny_klucz_do_podpisywania_tokenow";

app.use(express.json());
app.use(cors());

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ id: newUser.id });
  } catch (error) {
    res.status(400).json({
      error: "Registration error (perhaps that email is already taken?)",
    });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: "Wrong email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Wrong email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '15m'});

    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sequelize.sync().then(() => {
  console.log("Users DB is ready!");
  app.listen(PORT, () => {
    console.log(`User service is running on http://localhost:${PORT}`);
  });
});
