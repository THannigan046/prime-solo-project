const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM preset`
  pool.query(sqlText)
    .then((result) => {
      console.log('result is', result);
      res.send(result.rows)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('made it to server', req.body);
  const name = req.body.presetName
  const notes = req.body.notes
  const kicks = req.body.kicks
  const snares = req.body.snares
  const hats = req.body.hats
  const toms = req.body.toms
  const oscil = req.body.oscil
  const pattern = req.body.pattern
  const bpm = req.body.bpm
  const userId = req.body.userId

  let queryParams = [name, notes, kicks, snares, hats, toms, oscil, pattern, bpm, userId]
  const queryText =
    `INSERT INTO preset (name, notes, kicks, snares, hats, toms, oscil, pattern, bpm, user_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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

router.delete('/:id', (req, res) => {
  console.log('id is', req.params.id);
  let queryText =`
  DELETE FROM preset 
  WHERE id = $1
  `
  pool.query(queryText, [req.params.id])
  .then(() => {res.sendStatus(200);})
  .catch((err) => {
    console.log('delete error', err);
    res.sendStatus(500)
  })
})

module.exports = router;
