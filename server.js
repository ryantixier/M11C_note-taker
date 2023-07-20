const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    console.log(data);
    res.send(data);
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    let notes = JSON.parse(data);
    let newNote = {
      ...req.body,
      id: uniqid(),
    };
    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      res.json(newNote);
    });
  });
});

app.listen(PORT, () => {
  console.log("Server up and running");
});
