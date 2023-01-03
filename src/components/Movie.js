import React, { useState } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Style from "../styles/MovieStyle.module.css";
import ReactModal from "react-modal";

function Movie({ id, medium_cover_image, title, summary, genres, userObj }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const [reservedSeat, setReservedSeat] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setReservedSeat(value);
  };
  return (
    <div className={Style.Movie}>
      <img alt="cover_image" src={medium_cover_image} />
      <div className={Style.MovieDescription}>
        <Link to={`/detail/${id}`} className={Style.MovieDetailLink}>
          <h2>{title}</h2>
        </Link>
        <p>{summary}</p>
        <ul>
          <h3>Genres</h3>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <button onClick={toggleModal}>예약하기</button>
        <ReactModal isOpen={isOpen}>
          <form>
            예약할 인원 수 :{" "}
            <input
              type="number"
              placeholder="예약할 인원 수를 입력해주세요"
              value={reservedSeat}
              onChange={onChange}
            />
          </form>
          <button>예약하기</button>
          <button onClick={toggleModal}>Close</button>
        </ReactModal>
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
