const express = require('express')
const viewsCotroller = require('../controllers/viewsController')
const authController = require('../controllers/authController')

const router = express.Router()

router.get('/', authController.isLoggedIn, viewsCotroller.getOverview)
router.get('/tour/:slug', authController.isLoggedIn, viewsCotroller.getTour)
router.get('/login', authController.isLoggedIn, viewsCotroller.getLoginForm)
router.get('/signup', authController.protect, viewsCotroller.getSignUpForm)
router.get('/me', authController.protect, viewsCotroller.getAccount)

router.post(
    '/submit-user-data',
    authController.protect,
    viewsCotroller.updateUserData
)

module.exports = router
