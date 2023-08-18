import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/app';

const { expect } = chai;
chai.use(chaiHttp);

const client = chai.request(app).keepOpen();

describe('api', () => {
  context('/', () => {
    it('get data for given league_url', async () => {
      const response = await client
        .get('/')
        .query({
          league_url: 'https://sff-soccer.ezleagues.ezfacility.com/leagues/207941/Corporate-Coed-Championship.aspx'
        });
      
      const { standings, schedule } = response.body;
  
      expect(response.status).to.equal(200);
      expect(
        Object.keys(response.body),
      ).to.have.members(['standings', 'schedule', 'last_updated_at']);
  
      const teams = standings.map((st: any) => st.Team);
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

  context('/leagues', () => {
    it('get list of available leagues', async () => {
      const response = await client.get('/leagues');
      expect(response.status).to.eq(200);
      const leagues = response.body.leagues;
      expect(leagues).to.have.lengthOf(3);
      expect(leagues[0]).to.have.lengthOf(2);
    });
  });
});
