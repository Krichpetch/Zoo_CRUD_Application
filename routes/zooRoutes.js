const express = require('express');
const zooController = require('../controllers/zooController');

const router = express.Router();

router.get('/', zooController.zoo_index);


module.exports = router;