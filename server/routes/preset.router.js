const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
/**
 * GET route template 
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM preset WHERE user_id = $1`

  const sqlParams = [req.user.id]
  pool.query(sqlText, sqlParams)
    .then((result) => {
      console.log('result is', result);
      res.send(result.rows)
    })
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText =
    `SELECT * FROM PRESET WHERE ID = $1`

  const queryParams = [req.params.id]

  pool.query(queryText, queryParams)
    .then(dbRes => {
      if (dbRes.rows.length === 0) {
        res.status(404).send({
          message: `No preset found with id ${req.params.id}`
        })
        return;
      }
      res.send(dbRes.rows[0])
    })
    .catch(err => {
      console.error('get by id failed', err)
      res.sendStatus(500)
    })
})

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('made it to server', req.body);
  const name = req.body.name
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

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('made it to server, id is', req.body.id);
  const name = req.body.name
  const notes = req.body.notes
  const kicks = req.body.kicks
  const snares = req.body.snares
  const hats = req.body.hats
  const toms = req.body.toms
  const oscil = req.body.oscil
  const pattern = req.body.pattern
  const bpm = req.body.bpm
  const id = req.body.id
  const queryText = `UPDATE preset 
  SET name = $1, notes = $2, kicks = $3, snares = $4, hats = $5, toms = $6, oscil = $7, pattern = $8, bpm = $9
  WHERE id = $10
  `;
  let queryParams = [name, notes, kicks, snares, hats, toms, oscil, pattern, bpm, id]
  pool.query(queryText, queryParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('put error', error);
      res.sendStatus(500);
    })
})


router.delete('/:id', rejectUnauthenticated, (req, res) => {
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
