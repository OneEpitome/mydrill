import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Style from "../styles/MovieStyle.module.css";

function Movie({ id, medium_cover_image, title, summary, genres }) {
  return (
    <div className={Style.Movie}>
      <img alt="cover_image" src={medium_cover_image} />
      <div className={Style.MovieDescription}>
        <Link to={`/detail/${id}`}>
          <h2>{title}</h2>
        </Link>
        <p>{summary}</p>
        <ul>
          <h3>Genres</h3>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: propTypes.number.isRequired,
  medium_cover_image: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  summary: propTypes.string.isRequired,
  genres: propTypes.arrayOf(propTypes.string),
};

export default Movie;
