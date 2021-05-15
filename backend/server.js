const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const dbConfig = require("./config/db.config");
const apiRouter = require('./routes')

// routes
app.use('/api', apiRouter);


const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Pomyślnie połączono z MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
 app.get("/admin/questions", (req,res) => {
   res.json({message: "HERE"});
 })


// simple route
/*app.get("/admin/questions", (req, res) => {
  
  db.find({},(err,items) => {
    if(err) {
      console.log(err);
      res.status(500).send('An error occured', err);
    }
    else{
      res.render('/admin',{items:items});
    }
  })
  res.json({ message: "Witamy w aplikacji." });
}
  db.find().select("-__v").then(quest => {
    res.status(200).json(quest);
  })
  }
);*/

const User = require("./models/user.model");
const { user } = require("./models");
var storage = multer.diskStorage({destination: (req, file, cb)=>{
  cb(null,file.fieldname + '-' + Date.now())
}
});
const upload = multer ({storage: storage});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serwer wystartował na porcie ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });


      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports = app