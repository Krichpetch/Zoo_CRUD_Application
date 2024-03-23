const express = require('express');
const zooController = require('../controllers/zooController');

const router = express.Router();

router.get('/create', zooController.animal_create_get);
router.get('/', zooController.animal_index);
router.post('/', zooController.animal_create_post);
router.get('/:id', zooController.animal_details);
router.get('/update/:id', zooController.animal_update_get);
router.post('/update/:id', zooController.animal_update_post);
router.delete('/:id', zooController.animal_delete);

module.exports = router;