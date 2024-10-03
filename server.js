const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "randomdharmillovescoding";

app.use(express.json());
app.use(express.static(__dirname + "/public"));
const users = [];

function checkUser(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  req.user = user;
  next();
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/homepage.html");
});

app.post("/signup", checkUser, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (req.user) {
    res.json({
      message: "User already exists",
      userExists: true,
    });
    var str = true;
    res.header("str", str);
  } else {
    users.push({
      username: username,
      password: password,
    });

    res.json({
      message: "you are signed up!",
    });
  }
});

app.post("/signin", checkUser, function (req, res) {
  if (!req.user) {
    res.json({
      message: "Credentials incorrect",
    });
    return;
  } else {
    const token = jwt.sign(
      {
        username: req.user.username,
      },
      JWT_SECRET
    );
    res.header("jwt", token);
    res.json({
      token: token,
      redirect: "/todos",
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;
  console.log(token);
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData.username) {
    // req = {status, headers...., username, password, userFirstName, random; ":123123"}
    req.username = decodedData.username;
    next();
  } else {
    res.json({
      message: "You are not logged in",
    });
  }
}

app.get("/todos",auth, (req, res) => {
  const currentUser = req.username;
  const user = users.find((u) => u.username === currentUser);
  if(user){
    res.json({
      username: user.username,
      password: user.password,
    });
    res.sendFile(__dirname + "/public/todos.html");
  } else{
    res.json({
      message: "User Not Found!"
    })
  }

});

app.listen(3000);
