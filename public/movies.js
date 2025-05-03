const apiKey = "e672a5da20da266f2e2c153bcd39886b";
const genres = {
        "Action": 28,
        "Adventure": 12,
        "Animation": 16,
        "Comedy": 35,
        "Crime": 80,
        "Documentary": 99,
        "Drama": 18,
        "Family": 10751,
        "Fantasy": 14,
        "History": 36,
        "Horror": 27,
        "Music": 10402,
        "Mystery": 9648,
        "Romance": 10749,
        "Sci Fi": 878,
        "Tv movie": 10770,
        "Thriller": 53,
        "War": 10752,
        "Western": 37
};

const container = document.getElementById("movie-sections");

// Base URL for poster images
const posterBase = "https://image.tmdb.org/t/p/w500";

function fetchMoviesByGenre(genreName, genreId) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=hi-IN`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.results.length === 0) return;

      const section = document.createElement("div");
      section.classList.add("movie-section");

      const title = document.createElement("h2");
      title.textContent = genreName;

      const wrapper = document.createElement("div");
      wrapper.classList.add("movies-wrapper");

      data.results.slice(0, 15).forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        const img = document.createElement("img");
        img.src = posterBase + movie.poster_path;
        img.alt = movie.title;

       

        // Optional: click to go to player.html
        card.addEventListener("click", () => {
          const movieTitle = encodeURIComponent(movie.title);
          window.location.href = `/user/movieShow?title=${movieTitle}`;
        });

        card.appendChild(img);
        
        wrapper.appendChild(card);
      });

      section.appendChild(title);
      section.appendChild(wrapper);
      container.appendChild(section);
    });
}

// Fetch all genres
Object.entries(genres).forEach(([name, id]) => {
  fetchMoviesByGenre(name, id);
});

