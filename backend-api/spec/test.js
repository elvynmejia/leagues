const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/app');

const { expect } = chai;
chai.use(chaiHttp);

// global.request = chai.request(app);

client = chai.request(app).keepOpen();

describe('api', () => {
  it('/', async () => {
    const response = await client.get('/');
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

  describe('GET /questions', () => {
    it('ok', async () => {
      const query = [
        `league_url=${process.env.SFF_URL}`,
        'question=Who is in first place',
      ].join('&');

      const response = await client.get(`/questions?${query}`);
      expect(response.status).to.eq(200);
      expect(Object.keys(response.body)).to.have.members(['question', 'answer']);
    });
  });
});
