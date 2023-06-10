const { Router } = require('express');
const axios = require('axios');
const scrapper = require('../scrapper');

const router = Router();

router.get('/', async (req, res) => {
  const data = await scrapper(req.query.league_url);

  res.json({
    ...data,
    last_updated_at: (new Date()).toDateString(),
  });
});

router.post('/questions', async (req, res) => {
  const leagueUrl = req.query.league_url;
  const mmlContext = await scrapper(req.query.league_url);

  try {
    const response = axios.post('http://127.0.0.1:8000/questions', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
  } catch (error) {
    
  }
});

module.exports = router;
