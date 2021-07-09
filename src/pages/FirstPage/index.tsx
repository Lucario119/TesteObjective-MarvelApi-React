import React from 'react';
import { CharactersList } from '../../components/CharactersList';
import { Header } from '../../components/Header';
import { SearchCharacters } from '../../components/SearchCharacters';
import './styles.scss';

export const FirstPage: React.FC = () => {
  return (
    <div id="container">
      <Header />

      {/* <section className="search_characters_wrapper">
        <SearchCharacters />
      </section> */}
      <section className="characters_list_wrapper">
        <CharactersList />
      </section>
    </div>
  );
};
