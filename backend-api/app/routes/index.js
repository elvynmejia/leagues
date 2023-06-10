const { Router } = require('express');
const axios = require('axios');
const scrapper = require('../scrapper');

const router = Router();

const config = {
  llmUrl: process.env.MML_URL,
};

router.get('/', async (req, res) => {
  const data = await scrapper(req.query.league_url);

  res.json({
    ...data,
    last_updated_at: new Date().toDateString(),
  });
});

router.get('/questions', async (req, res, next) => {
  const leagueUrl = req.query.league_url;
  const userQuestion = req.query.question;
  const llmContext = await scrapper(leagueUrl);

  try {
    const response = await axios.post(`${config.llmUrl}/questions`, {
      question: userQuestion,
      context: llmContext,
    });

    const { question, answer } = response.data;

    return res.json({
      question,
      answer,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
