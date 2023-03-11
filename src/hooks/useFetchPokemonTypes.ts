import { useEffect, useState } from 'react';
import axios from '../services/axios';
import { PokemonList } from '../types';

export default function useFetchPokemonTypes() {
  const [data, setData] = useState<PokemonList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch = async () => {
    try {
      setLoading(true);
      const resp = await axios.get<PokemonList>('/type');
      setData(resp.data);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error };
}
