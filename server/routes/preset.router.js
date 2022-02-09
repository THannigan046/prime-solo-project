const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('made it to server', req.body);
  
});

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {

})

module.exports = router;
