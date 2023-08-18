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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app_1 = __importDefault(require("../app/app"));
const { expect } = chai_1.default;
chai_1.default.use(chai_http_1.default);
const client = chai_1.default.request(app_1.default).keepOpen();
describe('api', () => {
    context('/', () => {
        it('get data for given league_url', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield client
                .get('/')
                .query({
                league_url: 'https://sff-soccer.ezleagues.ezfacility.com/leagues/207941/Corporate-Coed-Championship.aspx'
            });
            const { standings, schedule } = response.body;
            expect(response.status).to.equal(200);
            expect(Object.keys(response.body)).to.have.members(['standings', 'schedule', 'last_updated_at']);
            const teams = standings.map((st) => st.Team);
            expect(teams).to.have.lengthOf.above(0);
            expect(standings).to.have.lengthOf.above(0);
            expect(schedule).to.have.lengthOf.above(0);
            expect(Object.keys(standings[0])).to.have.members([
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
            expect(Object.keys(schedule[0])).to.have.members([
                'Date',
                'Home',
                '',
                'Away',
                'Time/Status',
                'Venue',
                'Game Type',
                'Officials',
            ]);
        }));
    });
    context('/leagues', () => {
        it('get list of available leagues', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield client.get('/leagues');
            expect(response.status).to.eq(200);
            const leagues = response.body.leagues;
            expect(leagues).to.have.lengthOf(3);
            expect(leagues[0]).to.have.lengthOf(2);
        }));
    });
});
