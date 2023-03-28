const express = require('express')
const router = express.Router();

const query = require ('../controllers/con_users')

router.route('/').post(query)

module.exports = router