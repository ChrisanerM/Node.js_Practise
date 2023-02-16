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
route.get("/users", (req, res) => {
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
route.post("/register", bodyParser.json(), (req, res) => {
  let detail = req.body;
  console.log(detail);
});

//UPDATE
route.put("/user/:id", bodyParser.json(), (req, res)=>{
  let det = req.body;
  const strQry = 
  `
  UPDATE Users
  SET?
  WHERE userID= ?;
  `;
  //db
  db.query(strQry,[data,req.params.id],(err, data) => {
    if (err) throw err;
    res.status(200).json({msg: "A new row was affected" });
  })

});
//DELETE
route.delete("/user/:id", bodyParser.json(), (req, res) => {
  const strQry = 
  `
  DELETE FROM Users
  SET?
  WHERE userID= ?;
  `;
  db.query(strQry,[req.params.id],(err, data) => {
    if (err) throw err;
    res.status(200).json({msg: "A new row was affected" });
  })
});
// Login
route.patch('/login', bodyParser.json(), (req, res)=>{
    const {emailAdd, userPass} = req.body;
    const strQry =
    `
    SELECT firstName, lastName, emailAdd, userPass,
    country
    FROM Users
    WHERE emailAdd = '${emailAdd}';
    `;
    db.query(strQry, (err, data)=>{
        if(err) throw err;
        if((!data.length) || (data == null)) {
            res.status(401).json({err:
                "You provide a wrong email address"});
        }else {
            let {firstName, lastName} = data[0];
            if(userPass === data[0].userPass) {
                res.status(200).json({msg:
                    `Welcome back, ${firstName} ${lastName}`});
            }else {
                res.status(200).json({err:
                    `You provide a wrong password`});
            }
        }
    })
})
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
