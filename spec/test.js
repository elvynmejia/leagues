const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;
chai.use(chaiHttp);

global.request = chai.request(app);

describe('api', () => {
  it('/', async () => {
    const response = await global.request.get('/');
    const { standings, schedule } = response.body;

    expect(response.status).to.equal(200);
    expect(
      Object.keys(response.body),
    ).to.have.members(['standings', 'schedule']);

    const teams = standings.map((st) => st.Team);

    expect(teams).to.have.members([
      'InnerThread',
      'GrandRounds',
      'Battery',
      'Astranis',
      'DataBricks',
      'DyDx',
    ]);

    expect(standings[0]).to.deep.equal({
      Team: 'InnerThread',
      GP: '3',
      W: '3',
      L: '0',
      T: '0',
      GF: '19',
      GA: '0',
      PTS: '9',
      GD: '19',
      WP: '1.000',
    });

    expect(schedule[0]).to.deep.equal({
      Date: 'Mon-Oct 18',
      Home: 'Battery',
      '': '4 - 0',
      Away: 'Astranis',
      'Time/Status': 'Complete',
      Venue: 'Mission Bay F1',
      'Game Type': 'Regular',
      Officials: '',
    });

    expect(standings).to.have.length(6);
    expect(schedule).to.have.length(27);
  });
});
