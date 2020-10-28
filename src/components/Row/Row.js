import React, { useEffect, useState } from 'react'
import axios from "../../axios";
import "./Row.css"

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL }) {


    const [movies, setMovies] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL)
            setMovies(request.data.results);
            return request
        }

        fetchData()
    }, [fetchURL])
    console.log(movies)
    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>

            {/* container -> posters */}
            <div className="row__posters">

                {movies.map(movie => (
                    (movie.poster_path) ?
                        <img
                            key={movie.id}
                            className="row__poster"
                            src={`${baseUrl}${movie.poster_path}`}
                            alt={movie.name}
                        />
                        :
                        <></>
                ))}
            </div>

        </div>
    )
}

export default Row
