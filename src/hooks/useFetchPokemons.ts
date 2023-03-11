import { useEffect, useState } from 'react';
import axios from '../services/axios';
import { PokemonType, PokemonList } from '../types';
import { intersectionBy } from 'lodash';
export default function useFetchPokemonTypes({
  selectedTypes,
}: {
  selectedTypes: string[];
}) {
  const [data, setData] = useState<PokemonList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);

  const fetch = async () => {
    try {
      setLoading(true);
      let response;
      if (selectedTypes.length) {
        const resp = await Promise.all(
          selectedTypes.map(async (type) => {
            const result = await axios.get(`/type/${type}/`);
            return result.data.pokemon.map(
              (item: { pokemon: { name: string; url: string } }) => item.pokemon
            );
          })
        );

        const commonValues = intersectionBy<PokemonType>(...resp, 'name');

        response = {
          data: {
            results: commonValues,
            count: commonValues.length,
          },
        };
      } else {
        response = await axios.get<PokemonList>('/pokemon', {
          params: {
            offset,
          },
        });
      }

      if (response?.data?.results) {
        const resp2: PokemonType[] = await Promise.all(
          response.data.results.map(async (item) => {
            const itemResp = await axios.get<PokemonType>(
              `/pokemon/${item.name}/`
            );
            return itemResp.data;
          })
        );
        setData({ ...response.data, results: resp2 });
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const onNext = () => {
    setOffset((prev) => (prev < (data?.count || 100) ? prev + 20 : prev));
  };

  const onPrev = () => {
    setOffset((prev) => (prev > 0 ? prev - 20 : prev));
  };

  useEffect(() => {
    fetch();
  }, [offset, selectedTypes]);

  return { data, loading, error, onNext, onPrev };
}
