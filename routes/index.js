const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const cIndex = require('./celebrities.routes');
router.use('/celebrities', cIndex);

const mIndex = require('./movies.routes');
router.use('/movies', mIndex);

module.exports = router;
