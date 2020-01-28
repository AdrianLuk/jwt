const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 5000;
const users = [
  {
    id: 1,
    username: "test",
    password: "test",
    firstName: "Test",
    lastName: "User"
  }
];

async function authenticate1({ username, password }) {
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ sub: user.id }, "helloooo");
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token
    };
  }
}
function authenticate(req, res, next) {
  authenticate1(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
}
app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/auth", authenticate);

app.listen(port, () => console.log(`Server started on port ${port}`));
