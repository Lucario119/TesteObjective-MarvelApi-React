import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

export const Header: React.FC = () => {
  return (
    <header id="header">
      <div className="header_content">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>Objective</h1>
        </Link>

        <div className="header_texts">
          <div>
            <strong>Lucas de Oliveira Silva Souza</strong>
            <span>Teste de Front-end</span>
          </div>
          <button>CB</button>
        </div>
      </div>
    </header>
  );
};
