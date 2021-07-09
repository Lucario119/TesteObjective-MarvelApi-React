import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import './styles.scss';
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

export const CharacterDetailPage: React.FC = () => {
  const [characters, setCharacters] = useState<Characters[]>([]);
  useEffect(() => {
    api
      .get(
        `characters?id=1017100&ts=${process.env.REACT_APP_TIMESTAMP}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
      .then((response) => {
        setCharacters(response.data.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id="page-content">
      <>
        <Header />
        {characters.map((character) => (
          <div className="character_detail">
            <div className="character">
              <img
                src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                alt=""
              />
              <h1>Nome: {character.name}</h1>
            </div>
            <div>
              Descrição: <span>{character.description}</span>
            </div>
        {}  
          </div>
        ))}
      </>
    </div>
  );
};
