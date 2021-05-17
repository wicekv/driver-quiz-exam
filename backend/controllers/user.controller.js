const Question = require('./../models/questions');
const User = require('./../models/user.model');

module.exports = {
  getQuestions: async (req, res) => {
    const data = await Question.find();
    const { length } = data;
    const ids = [];
    for (let i = 0; i < length; i++) {
      ids.push(i)
    }
    const idsTrimmed = ids.sort(() => Math.random() - 0.5).slice(0, 2)
    const ans = []
    idsTrimmed.forEach(id => {
      ans.push(data[id])
    })
    res.send(ans)

  },
  getUser: async (req, res) => {
    try {
      const user =  await User.findById(req.userId).populate('roles').exec();
      res.send(user)
    } catch (error) {
      res.status(500);
      res.send()
    }
  },
  getUsers: async (req, res) => {
    try {
      const users =  await User.find().exec();
      const data = users.map(({username, allScore}) => ({username, allScore}))
      res.send(data)
    } catch (error) {
      res.status(500);
      res.send()
    }
  },
  
  postUserScore: async (req, res) => {
    try {
      const {score} = req.body
      const user =  await User.findById(req.userId).populate('roles').exec();
      user.allScore = (user.allScore || 0) + score;
      await user.save()
      res.send(user)
    } catch (error) {
      res.status(500);
      res.send(error)
    }
  },
  postAnswer: async (req, res) => {
    try {
      const {} = req.body;
      const user =  User.findById(req.userId).populate('roles').exec();
      res.send(user)
    } catch (error) {
      res.statusCode(500);
      res.send()
    }
  }
}