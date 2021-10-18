const axios = require('axios');
const SFF_URL =
  'https://sff-soccer.ezleagues.ezfacility.com/leagues/207941/Corporate-Coed-Championship.aspx';

const baseUrl = SFF_URL;

class ScrapperError extends Error {};

class Scrapper {
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.options = options;
    this.data = [];
  }

  // get area() {
  //   return this.calcArea();
  // }

  getData(resource = null) {
    const url = resource ? `${this.baseUrl}/${resource}` : this.baseUrl;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch(e) {
      throw new ScrapperError(`Cannot get data ${JSON.stringify(e.message)}`)
    }
  }

  parse() {
    this.data = ''
  };
}
