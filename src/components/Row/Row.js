import React, { useEffect, useState } from 'react'
import axios from "../../axios";
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer";
import "./Row.css"

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {

    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState('')

    useEffect(() => {
        async function fetchData() {

            const request = await axios.get(fetchURL)
            setMovies(request.data.results);
            return request
        }

        fetchData()
    }, [fetchURL])


    const handleClick = (movie) => {
        if (trailerUrl)
            setTrailerUrl('')
        else {
            movieTrailer(movie?.title || movie?.name || '')
                .then(url => {
                    const urlParam = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParam.get('v'))
                })
                .catch((error) => console.log(error))

        }
    }

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>

            {/* container -> posters */}
            <div className="row__posters">

                {movies.map(movie => (

                    <img
                        key={movie.index}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={movie.poster_path && `${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.title}
                    />

                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
