import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import requests from '../../requests'

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Banner() {
    const [movie, setMovies] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending)
            setMovies(request.data.results[Math.floor(Math.random() * request.data.results.length)])
        }

        fetchData()
    }, [])

    return (
        <header className="banner" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${baseUrl}${movie?.backdrop_path})` }}>
            {/* Background image */}
            <div className="banner__contents">
                {/* Title */}
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                {/* Div> 2 buttons */}
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                {/* Description */}
                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
            </div>

            <div className="banner--fadeBottom"></div>
        </header>
    )
}

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export default Banner
