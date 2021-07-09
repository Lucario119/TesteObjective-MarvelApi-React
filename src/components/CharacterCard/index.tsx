import React from 'react';
import './styles.scss';

interface CharactersProps {
  id: number;
  name: string;
  image: string;
  series?: any;
  events?: any;
  styles?: {
    styleImg?: any;
    styleDiv?: any;
    styleName?: any;
    styleSpan?: any;
  };
}
export const CharacterCard: React.FC<CharactersProps> = ({
  name,
  image,
  series,
  events,
  styles,
}) => {
  return (
    <div id="container_card" style={styles?.styleDiv}>
      <div className="name_and_image">
        <img src={image} alt={name} style={styles?.styleImg} />
        <h1 style={styles?.styleName}>{name}</h1>
      </div>
      <div className="series" style={styles?.styleDiv}>
        <span style={styles?.styleSpan}>{series}</span>
      </div>
      <div className="events" style={styles?.styleDiv}>
        <span style={styles?.styleSpan}>{events}</span>
      </div>
    </div>
  );
};
