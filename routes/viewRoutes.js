const express = require('express')
const viewsCotroller = require('../controllers/viewsController')
const authController = require('../controllers/authController')

const router = express.Router()

router.use(authController.isLoggedIn)

router.get('/', viewsCotroller.getOverview)
router.get('/tour/:slug', viewsCotroller.getTour)
router.get('/login', viewsCotroller.getLoginForm)
router.get('/signup', viewsCotroller.getSignUpForm)

module.exports = router