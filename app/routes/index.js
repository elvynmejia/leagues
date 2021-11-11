const { Router } = require('express');
const fs = require('fs');

const scrapper = require('../scrapper');

const router = Router();

router.get('/', async (req, res) => {
  // data for demos
  const dataFilePath = 'data.json';

  const data = await scrapper();

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFile(dataFilePath, JSON.stringify(data), (err) => {
      if (err) throw err;
    });
  }

  res.json({
    ...data,
    last_updated_at: (new Date()).toDateString(),
  });
});

module.exports = router;
