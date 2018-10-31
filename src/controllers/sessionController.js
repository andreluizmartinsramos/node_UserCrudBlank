const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
  async create (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: 'User/password are incorrect. 1' })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'User/password are incorrect. 2' })
    }

    const token = await jwt.sign({ id: user._id }, 'ENV_MD5_UMA_CONFIG')

    return res.json({ user, token })
  },

  async show (req, res) {
    const user = await User.findById(req.userId)

    return res.json(user)
  }
}
