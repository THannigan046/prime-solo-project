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
  const name = req.body.presetName
  const notes = req.body.notes
  const userId = req.body.userId

  let queryParams = [name, notes, userId]
  const queryText = 
  `INSERT INTO preset (name, notes, user_id)
  VALUES ($1, $2, $3)
  `;
  pool.query(queryText, queryParams)
    .then((result) => {
      console.log('query success');
      res.sendStatus(201)
    })
    .catch((error) => {
      console.log('query error', error);
      res.sendStatus(500)
    })
});

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {

})

module.exports = router;
