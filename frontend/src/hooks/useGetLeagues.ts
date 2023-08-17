import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

const requestLeagues = async () => {
  const url = `${process.env.REACT_APP_API_URL}/leagues`

  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.log(`Error fetching data from ${url}`);
    console.log({
      e,
    });
    throw e;
  }
};

const useGetLeagues = () => {
  const fetchLeagues = useCallback(() => requestLeagues(),[]);

  return useQuery({
    queryKey: ['get-leagues'],
    queryFn: () => fetchLeagues(),
  });
};

export default useGetLeagues;