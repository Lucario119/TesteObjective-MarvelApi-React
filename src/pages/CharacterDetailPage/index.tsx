import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { useLocation } from 'react-router-dom';

import './styles.scss';
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
interface Comics {
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export const CharacterDetailPage: React.FC = () => {
  const location = useLocation();
  const characterId = location.pathname.substr(17, 7);
  const [character, setCharacter] = useState<Character>();
  const [comics, setComics] = useState<Comics[]>([]);
  useEffect(() => {
    api
      .get(
        `characters?id=${characterId}&ts=${process.env.REACT_APP_TIMESTAMP}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
      .then((response) => {
        setCharacter(response.data.data.results[0]);
      })
      .catch((error) => {
        console.error(error);
      });
    api
      .get(
        `characters/${characterId}/comics?ts=${process.env.REACT_APP_TIMESTAMP}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
      .then((response) => {
        setComics(response.data.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [characterId]);

  return (
    <div id="page-content">
      <>
        <Header />
        {character && (
          <div className="character_detail">
            <div className="character">
              <h1>Nome: {character.name}</h1>

              <img
                src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                alt=""
              />
            </div>
            <div className="character-texts">
              {character.description ? (
                <span>Descri????o: {character.description}</span>
              ) : (
                <span>
                  Infelizmente este personagem n??o tem descri????o dispon??vel
                </span>
              )}
              {character.series.items.length > 0 ? (
                <span>
                  {' '}
                  S??ries:{' '}
                  {character.series.items
                    .slice(0, 5)
                    .map((value) => value.name)}
                </span>
              ) : (
                <span>
                  Infelizmente este personagem n??o tem s??ries dispon??veis
                </span>
              )}
              {character.events.items.length > 0 ? (
                <span>
                  Eventos:{' '}
                  {character.events.items
                    .slice(0, 4)

                    .map((value) => value.name)}
                </span>
              ) : (
                <span>
                  Infelizmente este personagem n??o tem eventos dispon??veis
                </span>
              )}
            </div>
            <div className="comics">
              {comics.length > 0 ? (
                comics.slice(0, 3).map((comic) => (
                  <>
                    <div>
                      <span>{comic.title}</span>
                      <img
                        src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                        alt=""
                      />
                    </div>
                  </>
                ))
              ) : (
                <h1>
                  Infelizmente este personagem n??o tem apari????es em HQs
                  dispon??veis
                </h1>
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};
