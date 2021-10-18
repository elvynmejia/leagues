const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

const port = 3001;

const SFF_URL =
  'https://sff-soccer.ezleagues.ezfacility.com/leagues/207941/Corporate-Coed-Championship.aspx';

const VALID_HEADERS = ['GP', 'W', 'L', 'T', 'GF', 'GA', 'PTS', 'GD', 'WP'];
const INVALID_HEADERS = ['', 'Calendar Sync', 'Get CalendarCopy Sync URL'];

const parseStats = (context, element) => {
  return element
    .children()
    .toArray()
    .map((e) => context(e).text().trim())
    .filter((e) => !INVALID_HEADERS.includes(e));
};

const getStats = async (url) => {}

const scrapper = async () => {
  let data = [];

  try {
     const response = await axios.get(SFF_URL);
     data = response.data;
  } catch(e) {
    console.error('Error loading stats data');
    return [];
  }

  const $ = cheerio.load(data);

  const body = $('#ctl00_C_Standings_GridView1 > tbody');

  const [headerRow, ...bodyRows] = $(body.children());

  let headers = $(headerRow)
    .children()
    .toArray()
    .map((element) => $(element).text().trim())
    .filter((header) => VALID_HEADERS.includes(header));

  const stats = $(bodyRows)
    .toArray()
    .map((e) => parseStats($, $(e)));

  headers = ['Team', ...headers];

  const standings = stats.map((fact) => {
    return fact.reduce((accumulator, current, index) => {
      return {
        ...accumulator,
        [headers[index]]: current,
      };
    }, {});
  });

  return standings;
};

app.get('/', async (req, res) => {
  res.send({
    statistics: await scrapper(),
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
