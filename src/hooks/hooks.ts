import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';

interface Characters {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description: string;
  url: string;
}
interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description: string;
  url: string;
  series: {
    items: [{ name: string }];
  };
  events: {
    items: [{ name: string }];
  };
}
interface RequestInfoPagination {
  total: number;
}
const limit = 10;

export function useFetchCharacters() {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [requestInfo, setRequestInfo] = useState<RequestInfoPagination>();

  useEffect(() => {
    setIsLoading(true);

    api
      .get(
        `characters?limit=${limit}&offset=${offset}&ts=${process.env.REACT_APP_TIMESTAMP}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
      .then((response) => {
        setRequestInfo(response.data.data);
        setCharacters(response.data.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(true);
        console.error(error);
      });
  }, [offset]);
  return { characters, isLoading, setOffset, requestInfo, offset };
}
export function useSearchCharacter() {
  const history = useHistory();

  const [character, setCharacter] = useState<Character>();
  const [search, setSearch] = useState('');
  const [submitForm, setSubmitForm] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    api
      .get(
        `characters?name=${search}&ts=${process.env.REACT_APP_TIMESTAMP}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
      .then((response) => {
        setCharacter(response.data.data.results[0]);
      });
    setSubmitForm(true);

    history.push(`?query=${search.toLowerCase()}`);

    if (search === '') {
      window.location.reload(true);
      history.push('/');
    }
  }
  return { character, setSearch, submitForm, search, handleSubmit };
}
