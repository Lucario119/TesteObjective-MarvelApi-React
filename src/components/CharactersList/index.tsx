import React, { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../services/api';
import { CharacterCard } from '../CharacterCard';
import { SelectPages } from '../SelectPages';
import SearchIcon from '../../assets/search.svg';

import './styles.scss';
import { Link, useHistory } from 'react-router-dom';

interface Characters {
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
export const CharactersList: React.FC = () => {
  const history = useHistory();
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [requestInfo, setRequestInfo] = useState<RequestInfoPagination>();
  const [hasLoading, setHasLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    setHasLoading(true);

    api
      .get(
        `characters?limit=${limit}&offset=${offset}&ts=${process.env.REACT_APP_TIMESTAMP}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
      .then((response) => {
        setRequestInfo(response.data.data);
        setCharacters(response.data.data.results);
        setHasLoading(false);
      })
      .catch((error) => {
        setHasLoading(true);
        console.error(error);
      });
  }, [offset]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    api
      .get(
        `characters?name=${search}&limit=${limit}&offset=${offset}&ts=${process.env.REACT_APP_TIMESTAMP}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
      .then((response) => {
        setRequestInfo(response.data.data.results);
        setCharacters(response.data.data.results);
        setHasLoading(false);

        response.data.data.results.map((item: { name: Characters }) => {
          return characters.push(item.name);
        });
      });
    setSubmitForm(true);

    history.push(`?query=${search.toLowerCase()}`);

    if (search === '') {
      window.location.reload(true);
      history.push('/');
    }
  }

  return (
    <>
      <div id="page_content">
        <div className="search_characters_wrapper">
          <div className="container_search_character">
            <h1>Busca de personagens</h1>
            <h1>Nome do personagem</h1>
            <form className="search-wrapper" onSubmit={handleSubmit}>
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

          {submitForm &&
            // <div
            //   style={{ display: !submitForm ? 'none' : '' }}
            //   className="loading"
            // >
            //   Loading...
            // </div>

            characters.slice(0, 1).map((item) => (
              <div
                className="characterCard_container"
                style={{ display: !submitForm ? 'none' : '' }}
              >
                <Link
                  to={`/characterdetail/${item.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <CharacterCard
                    styles={{
                      styleDiv: {
                        height: '20rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap:'4rem'
                      },
                      styleImg: { height: '15rem', width: '15rem' },
                      styleName:{fontSize: '3ch'},
                      styleSpan: {fontSize:'3ch'}
                    }}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={`${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}`}
                    series={
                      item.description ||
                      item.series.items.slice(0, 2).map((value) => value.name)
                    }
                    events={item.events.items
                      .slice(0, 2)
                      .map((value) => value.name)}
                  />
                </Link>
              </div>
            ))}
        </div>

        <div
          className="container_charactersList"
          style={{ display: submitForm ? 'none' : '' }}
        >
          {hasLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="characters-grid">
              {characters.length > 0 &&
                characters.map((character) => (
                  <Link
                    to={`/characterdetail/${character.id}`}
                  
                    style={{ textDecoration: 'none' }}
                  >
                    <CharacterCard
                  
                      key={character.id}
                      id={character.id}
                      name={character.name}
                      image={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                      series={
                        character.description ||
                        character.series.items
                          .slice(0, 2)
                          .map((value) => value.name)
                      }
                      events={character.events.items
                        .slice(0, 2)
                        .map((value) => value.name)}
                    />
                  </Link>
                ))}
            </div>
          )}

          {requestInfo && (
            <SelectPages
              key={limit}
              limit={limit}
              total={requestInfo.total}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </div>
      </div>
    </>
  );
};
