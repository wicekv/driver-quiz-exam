const fs = require('fs');
const path = require('path');
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Question = db.questions;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Użytkownik zarejestrowany pomyślnie!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Użytkownik zarejestrowany pomyślnie!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(403).send({ message: "Użytkownik nie znaleziony" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Nieprawidłowe Hasło!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.submit = (req, res) => {
  const { question: {
    photo, ...rest
  } } = req.body;
  const question = new Question({
    ...rest,
    img: {
      data: photo,
      contentType: 'image/png'
    }
  });
  question.save((err, question) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.redirect('/admin');
  });

  exports.findAll = (req, res) => {
    User.find({})
  }

  // var obj = {
  //   question: req.body.question,
  //   answear1: req.body.answear1,
  //   answear2: req.body.answear2,
  //   img: {
  //     //data: fs.readFileSync(path.join(__dirname + '/uploads' + req.file.filename)),
  //    data: req.body.img,
  //     contentType: 'image/png'
  //   }
  // }
  // db.create(obj, (err,item) => {
  //   if(err) {
  //     console.log(err);
  //   }
  //   else {
  //     res.redirect('/admin');
  //   }
  // })
}

exports.getData = async (req, res) => {
  const data = await Question.find();
  const {length} = data;
  const ids = [];
  for(let i =0; i< length; i++){
    ids.push(i)
  }
  const idsTrimmed = ids.sort(() => Math.random() - 0.5).slice(0,2)
  const ans = []
  idsTrimmed.forEach(id => {
    ans.push(data[id])
  })
  res.send(ans)

}


