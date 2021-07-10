import React from 'react';
import { CharacterCard } from '../CharacterCard';
import { SelectPages } from '../SelectPages';
import SearchIcon from '../../assets/search.svg';

import './styles.scss';
import { Link } from 'react-router-dom';
import { useSearchCharacter, useFetchCharacters } from '../../hooks/hooks';

const limit = 10;
export const CharactersList: React.FC = () => {
  const { characters, isLoading, requestInfo, setOffset, offset } =
    useFetchCharacters();
  const { character, setSearch, submitForm, search, handleSubmit } =
    useSearchCharacter();
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

          {character && (
            <div
              className="characterCard_container"
              style={{ display: !submitForm ? 'none' : '' }}
            >
              <Link to={`/characterdetail/${character.id}`}>
                <CharacterCard
                  styles={{
                    styleDiv: {
                      height: '20rem',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4rem',
                    },
                    styleImg: { height: '15rem', width: '15rem' },
                    styleName: { fontSize: '3ch' },
                    styleSpan: { fontSize: '3ch' },
                  }}
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  image={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                  series={
                    character.description ||
                    character.series.items
                      .slice(0, 4)
                      .map((value) => value.name)
                  }
                  events={character.events.items
                    .slice(0, 3)
                    .map((value) => value.name)}
                />
              </Link>
            </div>
          )}
        </div>

        {search === '' && (
          <div
            className="container_charactersList"
            style={{ display: submitForm ? 'none' : '' }}
          >
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className="characters-grid">
                {characters.length > 0 &&
                  characters.map((character) => (
                    <Link to={`/characterdetail/${character.id}`}>
                      <CharacterCard
                        key={character.id}
                        id={character.id}
                        name={character.name}
                        image={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                        series={
                          character.description ? (
                            character.description.substr(0, 218)
                          ) : (
                            <span>
                              Infelizmente este personagem não tem descrição
                              disponível
                            </span>
                          )
                        }
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
        )}
      </div>
    </>
  );
};
