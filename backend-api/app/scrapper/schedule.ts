import { JSDOM } from 'jsdom';

import { VALID_SCHEDULE_HEADERS } from './constants';

const getSchedule = (dom: JSDOM) => {
  const table = dom.window.document.querySelector(
    '#ctl00_c_Schedule1_GridView1 > tbody',
  );

  const transformedHeaders = Array.from(
    table?.querySelectorAll('th') || [],
  ).map((heading) => heading.textContent?.trim());

  const body = table?.querySelectorAll('tr td');

  const rows = Array.from(body || []).map((row) => row.textContent?.trim());

  const transformedRows = rows
    .join(',')
    .split(',,')
    .map((r: string) => r.split(','));

  const headinsToRowsTransformer = (fact: any[]) => {
    return fact.reduce(
      (
        accumulator: Record<string, string>,
        current: Record<string, string>,
        index: number,
      ) => {
        if (
          VALID_SCHEDULE_HEADERS.includes(transformedHeaders[index] as string)
        ) {
          return {
            ...accumulator,
            [transformedHeaders[index] as string]: current,
          };
        }

        return accumulator;
      },
      { Officials: '' },
    );
  };

  const schedule = transformedRows.map((fact: string[]) =>
    headinsToRowsTransformer(fact),
  );

  return schedule;
};

export default getSchedule;