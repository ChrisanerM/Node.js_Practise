const express = require("express");
//path
const path = require("path");
//db
const db = require("./config");
//body-parser CONVERTS TEST DATA/ANY FORM OF DATA FROM THE USER TO JSON
const bodyParser = require("body-parser");
//port
const port = parseInt(process.env.port) || 4000;
//Express app
const app = express();
//Router
const route = express.Router();

app.use(route, express.json, bodyParser.urlencoded({ extended: false }));

//Home or /
route.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "./view/index.html"));
});

//Retrieve all users
route.get('/users', (req, res) => {
  const strQry = `SELECT firstName,lastName, emailAdd, country
    FROM Users;
    `;
  //db
  db.query(strQry, (err, data) => {
    if (err) throw err;
    res.status(200).json({ result: data });
  });
});

//Register
route.post('/register',bodyParser.json(), (req, res)=> {
  let detail = req.body;
  console.log(detail);
  //sql query
  const strQry = 
  `INSERT INTO Users
   SET ?;`;

  db.query(strQry, [detail], (err) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(200).json({ msg: "A new user record was saved" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
