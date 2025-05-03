const apiKey = 'e672a5da20da266f2e2c153bcd39886b';
const button = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");

let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18&region=IN&with_original_language=hi&sort_by=popularity.desc`;
const resultsContainer = document.querySelector(".search-results");
    resultsContainer.innerHTML = "";
fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                resultsContainer.innerHTML = "<p style='color:white;'>No results found.</p>";
                return;
            }

            data.results.forEach(movie => {
                const poster = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image";

                const movieCard = `
                    <div style="display:inline-block; margin: 10px; text-align:center; color:white;">
                        <img src="${poster}" alt="${movie.title}" style=aspect-ratio: 19/6; "width: 150px; border-radius: 10px;" onclick="window.location.href='/user/movieShow?title=${movie.title}'" />
                        
                    </div>
                `;
                resultsContainer.innerHTML += movieCard;
            });
        })
        .catch(error => {
            console.error("API error:", error);
            resultsContainer.innerHTML = "<p style='color:white;'>Failed to load results.</p>";
        });
button.addEventListener("click", function () {
   inputMovie();
});
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        inputMovie(); // Call the function to handle the search
    }
});
function inputMovie() {
    const search = searchInput.value.trim();
    if (search === "") {
        alert("Please enter a movie name or genre.");
        return;
    }
    // Clear the input field
    searchInput.value = "";
    // Call the function to search for movies
    searchMovie(search);
}
function searchMovie(search) {
    const resultsContainer = document.querySelector(".search-results");
    resultsContainer.innerHTML = ""; // Clear previous results
    // Step 1: Predefined genres and IDs (you can store this)
    const genreMap = {
        "action": 28,
        "adventure": 12,
        "animation": 16,
        "comedy": 35,
        "crime": 80,
        "documentary": 99,
        "drama": 18,
        "family": 10751,
        "fantasy": 14,
        "history": 36,
        "horror": 27,
        "music": 10402,
        "mystery": 9648,
        "romance": 10749,
        "sci fi": 878,
        "science fiction": 878,
        "tv movie": 10770,
        "thriller": 53,
        "war": 10752,
        "western": 37
    };
    
    // Step 2: Check if user input is a genre
    const cleanedInput = search.toLowerCase();
    const genreId = genreMap[cleanedInput];
    
    let url = "";
    
    if (genreId) {
        // If it's a genre, use discover
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;
    } else {
        // Otherwise, use search
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(search)}`;
    }
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                resultsContainer.innerHTML = "<p style='color:white;'>No results found.</p>";
                return;
            }

            data.results.forEach(movie => {
                const poster = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image";

                const movieCard = `
                    <div style="display:inline-block; margin: 10px; text-align:center; color:white;">
                        <img src="${poster}" alt="${movie.title}" style=aspect-ratio: 19/6; "width: 150px; border-radius: 10px;" onclick="window.location.href='/user/movieShow?title=${movie.title}'" />
                        
                    </div>
                `;
                resultsContainer.innerHTML += movieCard;
            });
        })
        .catch(error => {
            console.error("API error:", error);
            resultsContainer.innerHTML = "<p style='color:white;'>Failed to load results.</p>";
        });
}  