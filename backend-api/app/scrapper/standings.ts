import  { JSDOM } from 'jsdom';

import { VALID_STANDINGS_HEADERS } from './constants';

const getStandings = (dom: JSDOM) => {
  const table = dom.window.document.querySelector('#gvStandings > tbody');
    
  const body = table?.querySelectorAll('tr td');
  
  const headings = Array.from(
    table?.querySelectorAll('th') || []
  ).map(heading => heading.textContent?.trim());
  
  const transformedHeaders = [
    'Team',
    ...headings.filter((header) => {
      return VALID_STANDINGS_HEADERS.includes(header || '');
    })
  ];
  
  const rows = Array.from(
    body || []
  ).map(row => row.textContent?.trim());
  
  const transformedRows = rows.join(',')
    .split(',,')
    .map((r: string) => r.split(','));
  
  const headinsToRowsTransformer = (fact: any[]) => {  
    return fact.reduce((accumulator: Record<string, string>, current: Record<string, string>, index: number) => {
      if (transformedHeaders[index]) {
        return ({
          ...accumulator,
          [transformedHeaders[index] as string]: current,
        });
      }
  
      return accumulator;
    }, {});
  };
  
  const standings = transformedRows.map((fact: string[]) => headinsToRowsTransformer(fact));
  
  return standings;
};

export default getStandings;