const { Router } = require('express');
const axios = require('axios');
const scrapper = require('../scrapper');

const router = Router();

router.get('/', async (req, res) => {
  if (!req.query.league_url) {
    return res.status(422).json({
      errors: [],
      message: "Must provide league_url as a url param",
      code: 'UNPROCESSABLE_ENTITY'
    });
  }

  const data = await scrapper(req.query.league_url);

  res.json({
    ...data,
    last_updated_at: new Date().toDateString(),
  });
});

router.get('/leagues', (re, res) => {
  const leagues = process.env.LEAGUES.split(',').map(l => {
    return l.split('<>');
  });

  res.status(200).json({ leagues: leagues });
});

module.exports = router;
