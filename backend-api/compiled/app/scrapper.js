"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const cheerio = require('cheerio');
const VALID_STANDINGS_HEADERS = ['GP', 'W', 'L', 'T', 'GF', 'GA', 'PTS', 'GD', 'WP'];
const VALID_SCHEDULE_HEADERS = ['Date', 'Home', '', 'Away', 'Time/Status', 'Venue', 'Game Type', 'Officials'];
const INVALID_HEADERS = ['', 'Calendar Sync', 'Get CalendarCopy Sync URL'];
const parseStats = (context, element) => element
    .children()
    .toArray()
    .map((e) => context(e).text().trim())
    .filter((e) => !INVALID_HEADERS.includes(e));
const scrapper = (leagueUrl) => __awaiter(void 0, void 0, void 0, function* () {
    let data = [];
    try {
        const response = yield axios.get(leagueUrl);
        data = response.data;
    }
    catch (e) {
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
        .map((element) => $(element).text().trim())
        .filter((header) => VALID_STANDINGS_HEADERS.includes(header));
    const stats = $(standingBodyRows)
        .toArray()
        .map((e) => parseStats($, $(e)));
    standingsHeaderRow = ['Team', ...standingsHeaderRow];
    const standings = stats.map((fact) => fact.reduce((accumulator, current, index) => (Object.assign(Object.assign({}, accumulator), { [standingsHeaderRow[index]]: current })), {}));
    // parse schedule
    const scheduleTable = $('#ctl00_c_Schedule1_GridView1 > tbody');
    const [scheduleHeaderRow, ...scheduleBodyRows] = $(scheduleTable.children());
    const scheduleHeaders = $(scheduleHeaderRow)
        .children()
        .toArray()
        .map((e) => $(e).text().trim())
        .filter((e) => VALID_SCHEDULE_HEADERS.includes(e));
    const schedule = $(scheduleBodyRows).toArray().map((item) => $(item)
        .children()
        .toArray()
        .reduce((acc, e, index) => (Object.assign(Object.assign({}, acc), { [scheduleHeaders[index]]: $(e).text().trim() })), {}));
    return {
        standings,
        schedule,
    };
});
exports.default = scrapper;
