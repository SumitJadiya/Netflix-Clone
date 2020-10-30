import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import requests from '../../requests'

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Banner() {
    const [movie, setMovies] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovies(request.data.results[Math.floor(Math.random() * request.data.results.length)])
        }

        fetchData()
    }, [])

    console.log(requests.fetchNetflixOriginals)
    console.log("movie ->", movie)
    return (
        <header className="banner" style={{ backgroundImage: `url(${baseUrl}${movie?.backdrop_path})` }}>
            {/* Background image */}
            <div className="banner__contents">
                {/* Title */}
                <h1>{movie?.title || movie?.name || movie?.original_name}</h1>

            </div>
            {/* Div> 2 buttons */}
            {/* Description */}
        </header>
    )
}

export default Banner
