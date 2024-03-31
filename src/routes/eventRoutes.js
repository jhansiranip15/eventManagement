const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.post('/import', eventsController.importEvents);
router.get('/find', eventsController.findEvents);

module.exports = router;
