const express = require('express'),
  mysql = require('mysql'),
  fs = require('fs'),
  app = express(),
  cors = require('cors');
  config = require('./config/config.json');

// app.use(cors())

app.use(express.json()).use(express.urlencoded({extended: true}))
// Init Connection To Database
const db = mysql.createConnection(config);

db.connect((err)=> {
  if(err) {
    console.log(err)
  } else {
    console.log('Connected to database!')
  }
})

// Dynamic Route Import
getAllRoutes = () => {
  const routes = fs.readdirSync("./routes");
  routes.forEach((file) => {
    require(`./routes/${file}`)(app, db);
  });
};

app.use(cors([
  {origin:'http://localhost:3000/'},
  {origin:'http://localhost:3000/login'},
  {origin:'http://localhost:3000/register'},
  {origin:'http://localhost:3000/report'},
  {origin:'http://localhost:3000/reportindex'},
  {origin:'http://localhost:3000/admin'},
  {origin:'http://localhost:3000/reportindexadmin'},
  {origin:'http://localhost:3000/history'},
  ]))
  

app.listen(1241, () => console.log('Server Running at port 1241'));

(executor => {getAllRoutes()})()

{/* <Route component={ReportHistory} path="/history"/>
      <Route component={ReportIndexAdmin} path="/reportindexadmin"/>
      <Route component={ReportIndex} path="/reportindex"/>
      <Route component={Admindex} path="/admindex"/>
      <Route component={Admin} path="/admin"/>
      <Route component={Report} path="/report"/>
      <Route component={Register} path="/register"/>
      <Route component={Login} path="/login"/>
      <Route component={Index} path="/"/> */}