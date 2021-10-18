const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('tiny'));

const port = process.env.PORT || 3001;

const SFF_URL =
  'https://sff-soccer.ezleagues.ezfacility.com/leagues/207941/Corporate-Coed-Championship.aspx';

const VALID_STANDINGS_HEADERS = ['GP', 'W', 'L', 'T', 'GF', 'GA', 'PTS', 'GD', 'WP'];
const INVALID_HEADERS = ['', 'Calendar Sync', 'Get CalendarCopy Sync URL'];

const VALID_SCHEDULE_HEADERS= ['Date', 'Home', '',	 'Away',	'Time/Status',	'Venue',	'Game Type',	'Officials'];

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

  // parse standings
  const standingsTable = $('#ctl00_C_Standings_GridView1 > tbody');
  const [standingsHeaderRow, ...standingBodyRows] = $(standingsTable.children());

  let headers = $(standingsHeaderRow)
    .children()
    .toArray()
    .map((element) => $(element).text().trim())
    .filter((header) => VALID_STANDINGS_HEADERS.includes(header));

  const stats = $(standingBodyRows)
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

  // parse schedule
  const scheduleTable = $('#ctl00_C_Schedule1_GridView1 > tbody');
  const [scheduleHeaderRow, ...scheduleBodyRows] = $(scheduleTable.children());

  const scheduleHeaders = $(scheduleHeaderRow)
    .children()
    .toArray()
    .map(e => $(e).text().trim())
    .filter(e => VALID_SCHEDULE_HEADERS.includes(e))

  const schedule = $(scheduleBodyRows).toArray().map((item, i) => {
    return $(item)
      .children()
      .toArray()
      .reduce((acc, e, index) => {
        return {
          ...acc,
          [scheduleHeaders[index]]: $(e).text().trim() ,
        };
      }, {})
  });

  return {
    standings,
    schedule
  };
};

app.get('/', async (req, res) => {
  res.send({
    ...(await scrapper())
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
