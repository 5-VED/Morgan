const express = require("express");
const morgan = require("morgan"); // Logger Library
const { v4: uuidv4 } = require("uuid"); //uuid stands for universal unique identifier of 128 bits its a standard
const fs = require("fs");
const path = require("path");

const app = express();

//craeate a new token
morgan.token("id", function getId(req) {
  return req.id;
});

morgan.token("param", function (req, res, param) {
  return "userToken";
});

app.use(assigned);

let accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan(':id :param :method :status :url "HTTP/:http-version"'))

app.use(morgan(':id :param :method :status :url "HTTP/:http-version"',{stream:accessLogStream}));

app.get("/", (req, res) => {
  res.end("Morgan Logger App");
});

//Middelware to create a unique id
function assigned(req, res, next) {
  req.id = uuidv4();
  next();
}

//Server
app.listen(3000, () => {
  console.log("The Server is up at port 3000");
});
