import axios from 'axios';
import { JSDOM } from 'jsdom';

import getStandings from './standings';
import getSchedule from './schedule';

const getHTML = async (leagueUrl: string) => {
  try {
    const response = await axios.get(leagueUrl);
    return response.data;
  } catch (e) {
    return [];
  }
};

const scrapper = async (leagueUrl: string) => {
  const html = (await getHTML(leagueUrl)) as string;
  const dom = new JSDOM(html);

  const standings = getStandings(dom);
  const schedule = getSchedule(dom);
  return {
    standings: standings,
    schedule: schedule,
  };
};

export default scrapper;
