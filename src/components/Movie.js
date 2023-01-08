import React, { useState } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Style from "../styles/MovieStyle.module.css";
import ReactModal from "react-modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

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

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (reservedSeat !== "") {
        await addDoc(collection(db, "Users", userObj.uid, "Reservation"), {
          // Firestore 구조 : Users/user의 uid/영화고유넘버/Reservation
          creator: userObj.uid,
          displayName: userObj.displayName,
          createdAt: Date.now(),
          movieId: id,
          movieTitle: title,
          reservedSeat: reservedSeat,
        });
        setReservedSeat("");
      }
    } catch (e) {
      alert("알 수 없는 이유로 등록 실패");
      console.error("Error adding document: ", e);
    }
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
          <form onSubmit={onSubmit}>
            예약할 인원 수 :{" "}
            <input
              type="number"
              placeholder="예약할 인원 수를 입력해주세요"
              value={reservedSeat}
              onChange={onChange}
            />
            <button>예약하기</button>
          </form>
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
