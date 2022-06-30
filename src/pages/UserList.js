import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";

const UserList = () => {
  const [listDate, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
        )
        .then((res) => setListData((listDate) => [...listDate, res.data])); //on utilise cette synthax pour pas que les id s'ecrasent entre eux
    }
  }, []);

  return (
    <div className="user-list-page">
      <Header />
      <h2>
        favories <span>💖</span>
      </h2>
      <div className="result">
        {listDate.length > 0 ? (
          listDate.map((movie) => <Card movie={movie} key={movie.id} />)
        ) : (
          <h2>Aucun favori pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default UserList;
