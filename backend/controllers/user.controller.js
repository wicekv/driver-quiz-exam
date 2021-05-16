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
      res.statusCode(500);
      res.send()
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