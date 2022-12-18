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
    expect(teams).to.have.lengthOf.above(0);
    expect(standings).to.have.lengthOf.above(0);
    expect(schedule).to.have.lengthOf.above(0);
    expect(
      Object.keys(standings[0]),
    ).to.have.members([
      'Team',
      'GP',
      'W',
      'L',
      'T',
      'GF',
      'GA',
      'PTS',
      'GD',
      'WP',
    ]);

    expect(
      Object.keys(schedule[0]),
    ).to.have.members([
      'Date',
      'Home',
      '',
      'Away',
      'Time/Status',
      'Venue',
      'Game Type',
      'Officials',
    ]);
  });
});
