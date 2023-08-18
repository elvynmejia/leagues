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
const express_1 = require("express");
const scrapper_1 = __importDefault(require("../scrapper"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const leagueUrl = (_a = req.query.league_url) === null || _a === void 0 ? void 0 : _a.toString();
    if (!leagueUrl) {
        return res.status(422).json({
            errors: [],
            message: "Must provide league_url as a url param",
            code: 'UNPROCESSABLE_ENTITY'
        });
    }
    const data = yield (0, scrapper_1.default)(leagueUrl);
    res.json(Object.assign(Object.assign({}, data), { last_updated_at: new Date().toDateString() }));
}));
router.get('/leagues', (req, res) => {
    const leagues = process.env.LEAGUES || '';
    const parsedsLeagues = leagues.split(',').map(l => {
        return l.split('<>');
    });
    res.status(200).json({ leagues: parsedsLeagues });
});
exports.default = router;
