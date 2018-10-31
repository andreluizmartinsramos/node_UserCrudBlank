const express = require('express')
const userController = require('./controllers/userController')
const sessionController = require('./controllers/sessionController')

const authMiddleware = require('./middlewares/auth')

const router = express.Router()

router.get('/users', userController.index)
router.get('/users/:id', userController.show)
router.post('/users', userController.store)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.destroy)

router.post('/sessions', sessionController.create)
router.get('/sessions', authMiddleware, sessionController.show)

router.use((req, res) => {
  return res.status(404).json({ error: 'Page not found' })
})

router.use((err, req, res, next) => {
  console.log(err)
  return res.status(500).json({ error: 'Internal error' })
})

module.exports = router
