const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const Database = require("@replit/database");
const db = new Database();
const { readFile } = require('fs').promises;
const fs = require('fs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
port = process.env.port || 4468;
var moment = require('moment');
let timestamp = moment().format('LLLL')

function ErrCheck(err,res) {
  if (err) {
    console.log('Server Err',err);
    res.status(500).send("Internal Server Error");
  }
}
ErrCheck();
app.get("/", (req, res) => {
  loggedIn = req.cookies.loggedIn;
  username = req.cookies.username;
  cookieupdate = res.cookie(`Seenupdate`,`false`);
  if(cookieupdate == "false"){
    alert("Hello and welcome to the new school hub it's very much the same but you will need to signup agian sadly. But it's now wayy faster to use school hub so have fun and enjoy.")
    res.cookie(`Seenupdate`,`true`);
  }
  if (loggedIn == "false"){
      res.render("login.html",{username:username})
  }
  if(loggedIn == "true"){
    db.list().then(keys => {
      if(keys.includes(username)){
        res.render("loggedin.html",{username:username})
      } else{
        res.redirect("/logout");
      }
    });
  } else{
    res.render("login.html");
  }
});
app.get("/login", (req, res) => {
  loggedIn = req.cookies.loggedIn;
  if(loggedIn == "true"){
    res.redirect("/");
  } else{
    res.render("login.html");
  }
})

app.get("/signup", (req, res) => {
  loggedIn = req.cookies.loggedIn;
  if(loggedIn == "true"){
    res.redirect("/");
  } else{
    res.render("signup.html");
  }
});

app.post("/loginsubmit", (req, res) => {;
  var username = req.body.username;
  var password = req.body.password;
  db.list().then(keys => {
    if(keys.includes(username)){
      db.get(username).then(value => {
        if(password == value){
          res.cookie("loggedIn", "true");
          res.cookie("username", username);
          console.log("logged in successfully")
          res.redirect("/");
        } else{
          res.send("Wrong password.");
        }
      });
    } else{
      res.send("Account not found.");
    }
  });
});

app.post("/createaccount", (req, res) => {
  var newusername = req.body.newusername;
  newpassword = req.body.newpassword;
  letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  cap_letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  allchars = letters + cap_letters + numbers + ['_'];
  goodusername = true;
  for(let i of newusername){
    if(!allchars.includes(i)){
      goodusername = false;
    }
  }
  if(goodusername){
    db.list().then(keys => {
      if(keys.includes(newusername)){
        res.send("Username taken.");
      } else if(newusername == ""){
        res.send("Please enter a username.");
      } else if(newpassword == ""){
        res.send("Please enter a password.")
      } else{
        db.set(newusername, newpassword).then(() => console.log("new account created"));
        res.cookie("loggedIn", "true")
        res.cookie("username", newusername);
        res.redirect("/");
      }
    });
  } else{
    res.send("Username can only contain alphanumeric characters and underscores.")
  }
});

app.get("/logout", (req, res) => {
  ErrCheck();
  res.cookie("loggedIn", "false");
  res.clearCookie("username");
  res.redirect("/");
  console.log("successfully logged out")
});
app.get('/slope', async (request, response) => {
  if(loggedIn == "true"){
    response.send( await readFile('./games/slope.html', 'utf8') );
  }
});
app.get('/cookieclicker', async (request, response) => {
ErrCheck();
if(loggedIn == "true"){
    response.send( await readFile('./games/cookieclicker.html', 'utf8') );
  }
});
app.get('/packman', async (request, response) => {
if(loggedIn == "true"){
    response.send( await readFile('./games/packman.html', 'utf8') );
  }
});
app.get('/astray', async (request, response) => {
if(loggedIn == "true"){
    response.send( await readFile('./games/astray.html', 'utf8') );
  }
});
app.get('/onetrickmage', async (req, res) => {
if(loggedIn == "true"){
    
    response.send( await readFile('./games/onetrickmage.html', 'utf8') );
  }
});
app.get('/removeuser', async (req, res) => {
if(loggedIn == "true"){
   var removeduser = prompt('What usernam do you wanna remove')
   db.delete(removeduser).then(() => {});
   function LogBan(err){
  fs.appendFile('./logs/bannedusers.log', '\nNew Banned User ' + timestamp + ' ' + removeduser, function (err) {
  if (err) throw err;
  console.log('Banned!');
});
}
   LogBan(removeduser);
   res.send('User now banned' + removeduser)
  }
});
app.get('/shutdown', async (req, res) => {
  res.send('Shutting down the server...')
  console.log('server shutdown')
  app.set('Admin', 'True');
  quit()
})
app.listen(port, () => {
  console.log("server started");
})
// server logs
fs.appendFile('app.log', '\nServer Started:'+ timestamp + ' Log is 5 hours ahead', function (err) {
  if (err) throw err;
  console.log('Updated!');
});
app.get('/shutdown', async (req, res) => {
  res.send('Shutting down the server...')
  console.log('server shutdown')
  quit()
})
