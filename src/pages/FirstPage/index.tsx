import React from 'react';
import { CharactersList } from '../../components/CharactersList';
import { Header } from '../../components/Header';
import './styles.scss';

export const FirstPage: React.FC = () => {
  return (
    <div id="container">
      <Header />

      <section className="characters_list_wrapper">
        <CharactersList />
      </section>
    </div>
  );
};
