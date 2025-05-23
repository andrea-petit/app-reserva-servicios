const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/home/profesional", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "indexProfesional.html"));
});

app.get("/home/cliente", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "indexCliente.html"));
});




app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

