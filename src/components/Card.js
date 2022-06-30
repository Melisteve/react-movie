import React from "react";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  const dateFormater = (date) => {
    // on veux changer le forma de la date on utilise le methode spit et join qui son tres pratique pour manipuler les date
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  //l'api a mis le genre des fils dans un tableau et chaque chifre du tablea represente un genre du cout il va favoir rechercher les genres grace a und functuion

  const genrefinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      switch (movie.genre_ids[i]) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <li key={genre}>{genre}</li>);
  };

  const addStorage = () => {
    let storeData = window.localStorage.movies
      ? window.localStorage.movies.split(",") // on separe les ids
      : []; // on virie si notre utiliateur est deja venure sur le dite et s'il as une liste de favori

    if (!storeData.includes(movie.id.toString())) {
      // avec lea methode includes on admet que les inverses ou les element differrent de ceux deja prensent dans le tableau
      // le donner des id ne sont pas  vue comme des String du cout on applique la methode toString pour convertir
      storeData.push(movie.id);
      window.localStorage.movies = storeData;
    }
  };

  const deletestorage = () => {
    let storedData = window.localStorage.movies.split(",");
    let newData = storedData.filter((id) => id != movie.id); // on conserve tout les id des cart differnt del'id du cart sur lequelle on n'as cliquer

    window.localStorage.movies = newData;
    window.location.reload(); //on recharge la page pour faire disparaitre l'element on aurai pu utiliser le hook useContext ou redux pour faire passer les donner du compasant enfant au composant pareant pour eviter le rechargemen de la page
  };

  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt="affiche film"
      />
      <h2>{movie.title}</h2>
      {movie.release_date ? (
        <h5>sorti le: {dateFormater(movie.release_date)}</h5>
      ) : (
        "pas de date"
      )}
      {movie.vote_average > 6 ? (
        <h4>
          {movie.vote_average}/10 <span>👌</span>
        </h4>
      ) : (
        <h4>
          {movie.vote_average}/10 <span>🤏</span>
        </h4>
      )}
      <ul>
        Genre:{" "}
        {movie.genre_ids
          ? genrefinder()
          : movie.genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
      </ul>
      // on utile la ternere pour l'affichage des favorie dans la recherche avec
      les ids le genres est drectement donner il suffit de le maper genre_ids
      n'existe pas
      {movie.overview ? <h3>Synopsis</h3> : ""}
      <p>{movie.overview}</p>
      {movie.genre_ids ? (
        <div className="btn" onClick={() => addStorage()}>
          Ajouter au favoris
        </div>
      ) : (
        <div className="btn" onClick={() => deletestorage()}>
          supprimer de la liste
        </div>
      )}
    </div>
  );
};

export default Card;
