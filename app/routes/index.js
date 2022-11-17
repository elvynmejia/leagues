const { Router } = require('express');

const scrapper = require('../scrapper');

const router = Router();

router.get('/', async (req, res) => {
  const data = await scrapper(req.query.league_url);

  res.json({
    ...data,
    last_updated_at: (new Date()).toDateString(),
  });
});

module.exports = router;
