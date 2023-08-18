const axios = require('axios');
const cheerio = require('cheerio');

const VALID_STANDINGS_HEADERS = ['GP', 'W', 'L', 'T', 'GF', 'GA', 'PTS', 'GD', 'WP'];
const VALID_SCHEDULE_HEADERS = ['Date', 'Home', '', 'Away', 'Time/Status', 'Venue', 'Game Type', 'Officials'];

const INVALID_HEADERS = ['', 'Calendar Sync', 'Get CalendarCopy Sync URL'];

const parseStats = (context: any, element: any) => element
  .children()
  .toArray()
  .map((e: any) => context(e).text().trim())
  .filter((e: any) => !INVALID_HEADERS.includes(e));

const scrapper = async (leagueUrl: string) => {
  let data = [];

  try {
    const response = await axios.get(
      leagueUrl
    );
    data = response.data;
  } catch (e) {
    return data;
  }

  const $ = cheerio.load(data);

  // parse standings
  const standingsTable = $('#gvStandings > tbody');

  const standingsTableData = $(standingsTable.children());

  let standingsHeaderRow = standingsTableData[0];
  const standingBodyRows = standingsTableData.slice(1, standingsTableData.length);

  standingsHeaderRow = $(standingsHeaderRow)
    .children()
    .toArray()
    .map((element: any) => $(element).text().trim())
    .filter((header: any) => VALID_STANDINGS_HEADERS.includes(header));

  const stats = $(standingBodyRows)
    .toArray()
    .map((e: any) => parseStats($, $(e)));

  standingsHeaderRow = ['Team', ...standingsHeaderRow];

  const standings = stats.map((fact: any) => fact.reduce((accumulator: any, current: any, index: number) => ({
    ...accumulator,
    [standingsHeaderRow[index]]: current,
  }), {}));

  // parse schedule
  const scheduleTable = $('#ctl00_c_Schedule1_GridView1 > tbody');
  const [scheduleHeaderRow, ...scheduleBodyRows] = $(scheduleTable.children());

  const scheduleHeaders = $(scheduleHeaderRow)
    .children()
    .toArray()
    .map((e: any) => $(e).text().trim())
    .filter((e: any) => VALID_SCHEDULE_HEADERS.includes(e));

  const schedule = $(scheduleBodyRows).toArray().map((item: any) => $(item)
    .children()
    .toArray()
    .reduce((acc: any, e: any, index: any) => ({
      ...acc,
      [scheduleHeaders[index]]: $(e).text().trim(),
    }), {}));

  return {
    standings,
    schedule,
  };
};

export default scrapper;
