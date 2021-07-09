import React, { FormEvent, useEffect, useState } from 'react';
import SearchIcon from '../../assets/search.svg';
import { api } from '../../services/api';
import { CharacterCard } from '../CharacterCard';
import './styles.scss';

interface Characters {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
interface RequestInfo {
  total: number;
}

export const SearchCharacters: React.FC = (searching) => {
  const [character, setCharacter] = useState<Characters[]>([]);
  // const [requestInfo, setRequestInfo] = useState<RequestInfo>();
  const [searchCharacter] = useState(['name']);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    api
      .get(
        `characters?&ts=${process.env.REACT_APP_TIMESTAMP}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
      .then((response) => {
        // setRequestInfo(response.data.data);
        setIsSearching(true);
        setCharacter(response.data.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function searchByName(items: any[]) {
    return items.filter((item) => {
      return searchCharacter.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(search.toLowerCase()) >
          -1
        );
      });
    });
  }
  return (
    <>
      <div id="container_search_character">
        <h1>Busca de personagens</h1>
        <h1>Nome do personagem</h1>
        <form className="search-wrapper">
          <img src={SearchIcon} alt="Ícone de busca" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit"></button>
        </form>
      </div>

      {searchByName(character).map((item) => (
        <div style={{ display: !search ? 'none' : '' }}>
          <CharacterCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={`${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}`}
          />
        </div>
      ))}
    </>
  );
};
