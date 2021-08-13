const express = require('express'),
  cors = require('cors'),
  dotenv = require('dotenv'),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  app = express();

//use .env file
dotenv.config();
//Listening port
const PORT = process.env.PORT;

//cors
app.use(cors());
//template = ejs
app.set("view engine", "ejs")
//static folder
app.use(express.static('public'));
//methodOverride
app.use(methodOverride("_method"));
// Parses the body for POST, PUT, DELETE, etc.
app.use(bodyParser.json());

// connect with mongoDB
const mongo_url= process.env.MONGO_URL;
const db_name=process.env.MONGO_DB_NAME;
mongoose.connect(mongo_url+db_name, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log("It is connected with mongoDB!"))
  .catch(err => console.log(err));
  
//routes
app.use(require("./routes/index"));

//run
app.listen(PORT, function(req, res) {
  console.log('Server running with port '+PORT+' ...');
});
