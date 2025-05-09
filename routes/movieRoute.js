const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Helper to generate HTML
function generateMovieHTML(movies, isChannel = false) {
    return movies.map(movie => {
        if (isChannel) {
            return `
                <div class="movie-cardd">
                    <img 
                        src="${movie.image}" 
                        alt="${movie.title}" 
                        onclick="window.location.href='https://www.youtube.com/embed/live_stream?channel=${movie.channelId}&autoplay=1'"
                        style="aspect-ratio: 19/6;"
                    />
                </div>
            `;
        } else {
            return `
                <div class="movie-cardd">
                    <img 
                        src="${movie.image}" 
                        alt="${movie.title}" 
                        onclick="window.location.href='/user/movieShow?title=${encodeURIComponent(movie.title)}'"
                        style="aspect-ratio: 19/6;"
                    />
                </div>
            `;
        }
    }).join("");
}

// Unified GET /api/home route
router.get("/", (req, res) => {
    const moviePath = path.join(__dirname, "../server/movie.json");

    fs.readFile(moviePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to load movie data." });
        }

        const movieData = JSON.parse(data);

        const htmlResponse = {
            Comedy_Carnival: generateMovieHTML(movieData.Comedy_Carnival),
            Latest_Releases: generateMovieHTML(movieData.Latest_Releases),
            Team_Marvel_And_Team_DC: generateMovieHTML(movieData.Team_Marvel_And_Team_DC),
            Popular_in_Biopic: generateMovieHTML(movieData.Popular_in_Biopic),
            Action_Movies: generateMovieHTML(movieData.Action_Movies),
            Popular_Shows: generateMovieHTML(movieData.Popular_Shows),
            News_Channel: generateMovieHTML(movieData.News_Channel, true)
        };

        res.json(htmlResponse);
    });
});

module.exports = router;
