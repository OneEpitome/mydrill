import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Style from "../styles/HomeStyle.module.css";

const Home = ({ isLoggin, userObj }) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&&sort_by=year"
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading now ...</h1>
      ) : (
        <div className={Style.Movies}>
          {movies.map((movie) => {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                medium_cover_image={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
                userObj={userObj}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
