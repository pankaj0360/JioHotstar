document.addEventListener("DOMContentLoaded", async () => {
    const sourceElement = document.getElementById("movie-video");
    const titleElement = document.getElementById("movie-title");
    const infoElement = document.querySelector("#info1");
    const descriptionElement = document.getElementById("info2");
    const movieElement = document.getElementById("info3");

    const apiKey = 'e672a5da20da266f2e2c153bcd39886b';
    const movieTitle = new URLSearchParams(window.location.search).get('title');

    if (!movieTitle) {
        document.body.innerHTML = "<h2>No movie title provided</h2>";
        return;
    }

    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`);
        const data = await res.json();
        const movie = data.results[0];

        if (!movie) throw new Error("Movie not found");

        // Update movie details on the page
        titleElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        sourceElement.src = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
        sourceElement.style.aspectRatio = "19 / 6";
        movieElement.textContent = `Release Date: ${movie.release_date}`;
        infoElement.innerHTML = `Rating: ${movie.vote_average}`;
        descriptionElement.textContent = movie.overview;
    } catch (err) {
        document.body.innerHTML = `<h2>${err.message}</h2>`;
    }
});
