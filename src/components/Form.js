import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("disney");
  const [sortGoodBad, setSortGoodBad] = useState(null); // pour faire le tries des films

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${search}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]); //on appele axios apres que composant soit monte si n'y rien dans ls callback il se joue une seul fois s'il y un parametre il ne se rejoue que quand le parametre est remplie

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Entrer le titre d'un film"
            id="search-input"
          />
          <input type="submit" value="Rechercher" />
        </form>

        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Top<span>➜</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            flop<span>➜</span>
          </div>
        </div>
      </div>

      <div className="result">
        {moviesData
          .slice(0, 12)
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
      </div>
    </div>
  );
};

export default Form;
