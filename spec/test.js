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
    ).to.have.members(['standings', 'schedule', 'last_updated_at']);

    const teams = standings.map((st) => st.Team);

    expect(teams).to.have.members([
      'InnerThread',
      'GrandRounds',
      'Battery',
      'Astranis',
      'DataBricks',
      'DyDx',
    ]);

    // fragile test
    expect(standings[0]).to.deep.equal({
      GA: '0',
      GD: '21',
      GF: '21',
      GP: '4',
      L: '0',
      PTS: '12',
      T: '0',
      Team: 'InnerThread',
      W: '4',
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
