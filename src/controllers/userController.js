const User = require('../models/User')

module.exports = {
  async index (req, res) {
    const users = await User.find({})
    return res.json(users)
  },
  async show (req, res) {
    const user = await User.findById(req.params.id)
    return res.json(user)
  },
  async store (req, res, next) {
    try {
      const user = await User.create(req.body)

      return res.json(user)
    } catch (err) {
      return next(err)
    }
  },
  async update (req, res) {
    const { password, ...data } = req.body
    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true
    })

    if (password) {
      user.password = password

      await user.save()
    }

    return res.json(user)
  },
  async destroy (req, res) {
    const user = await User.findByIdAndDelete(req.params.id, req.body)
    return res.json(user)
  }
}
