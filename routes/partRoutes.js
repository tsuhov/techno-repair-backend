const express = require('express');
const { getParts, getFilters } = require('../controllers/partController');

const router = express.Router();

router.get('/', getParts);
router.get('/filters', getFilters);

module.exports = router;
