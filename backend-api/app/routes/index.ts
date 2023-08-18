import { Router, Request, Response } from 'express';
import scrapper from '../scrapper';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const leagueUrl = req.query.league_url?.toString();
  if (!leagueUrl) {
    return res.status(422).json({
      errors: [],
      message: "Must provide league_url as a url param",
      code: 'UNPROCESSABLE_ENTITY'
    });
  }

  const data = await scrapper(leagueUrl);

  res.json({
    ...data,
    last_updated_at: new Date().toDateString(),
  });
});

router.get('/leagues', (req: Request, res: Response) => {
  const leagues = process.env.LEAGUES || '';

  const parsedsLeagues = leagues.split(',').map(l => {
    return l.split('<>');
  });

  res.status(200).json({ leagues: parsedsLeagues });
});

export default router;
