document.addEventListener("DOMContentLoaded", () => {
    const trendingMovies = document.querySelectorAll(".trending-movie");
    const videoElement = document.getElementById("main-video"); // Target the <video> element
    const sourceElement = document.getElementById("movie-video");
    const titleElement = document.getElementById("movie-title");
    const infoElement = document.querySelector("#info1");
    const descriptionElement = document.getElementById("info2");
    const movieElement = document.getElementById("info3");
    const muteButton = document.querySelector(".material-symbols-outlined");
    const watchButton = document.querySelector(".watch-now");
    

    function toggleMenu() {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('active');
      }
      
    // Mute and unmute the video
    muteButton.addEventListener("click", () => {
        if (videoElement.muted) {
            videoElement.muted = false;
            muteButton.textContent = "volume_off";
        }
        else {
            videoElement.muted = true;
            muteButton.textContent = "volume_up";
        }
    }
    );

    let currentIndex = 0;

    function updateMovieDetails(movie) {
        const newVideoSrc = movie.getAttribute("data-video");
        const newTitle = movie.getAttribute("data-title");
        const newInfo = movie.getAttribute("data-info");
        const newDescription = movie.getAttribute("data-description");
        const type = movie.getAttribute("movie-type");
        const movieName = movie.getAttribute("movie_name");
        
    
        // Update source
        sourceElement.src = newVideoSrc;
        
    
        // Update text and title image
        titleElement.src = newTitle;
        infoElement.innerHTML = newInfo;
        descriptionElement.textContent = newDescription;
        movieElement.textContent = type;
        watchButton.addEventListener("click", () => {
            window.location.href = `/user/movieShow?title=${encodeURIComponent(movieName)}`;
        });
        videoElement.load();
        videoElement.play();
    }
    
    // Manual click listener
    trendingMovies.forEach(movie => {
      
        movie.addEventListener("click", () => {
            updateMovieDetails(movie);
            
        });
        

    });
    
    // Auto-switch every 17 seconds
    setInterval(() => {
        const movie = trendingMovies[currentIndex];
        updateMovieDetails(movie);
    
        currentIndex = (currentIndex + 1) % trendingMovies.length; // Loop through
    }, 8000); // 8000 ms = 8 seconds
    

    
});
document.addEventListener("DOMContentLoaded", async () => {
    await fetch("/api/home")
        .then(response => response.json())
        .then(data => {
            document.getElementById("comedy-container").innerHTML = data.Comedy_Carnival;
            document.getElementById("latest-container").innerHTML = data.Latest_Releases;
            document.getElementById("Super-container").innerHTML = data.Team_Marvel_And_Team_DC;
            document.getElementById("Biopic-container").innerHTML = data.Popular_in_Biopic;
            document.getElementById("Action_Movies-container").innerHTML = data.Action_Movies;
            document.getElementById("Shows-container").innerHTML = data.Popular_Shows;
            document.getElementById("News-container").innerHTML = data.News_Channel;

            // Initialize sliders once all content is loaded
            document.querySelectorAll(".slider-container").forEach(slider => initializeSlider(slider));
        });
});

function initializeSlider(sliderContainer) {
    const movieCards = sliderContainer.querySelector(".movie-cardss");
    if (!movieCards) return;

    const prevBtn = sliderContainer.querySelector(".prev");
    const nextBtn = sliderContainer.querySelector(".next");

    let currentSlide = 0;
    const totalCards = movieCards.querySelectorAll(".movie-cardd").length;
    const cardsPerView = 8;

    setTimeout(() => {
        const cardWidth = movieCards.querySelector(".movie-cardd")?.offsetWidth + 0 // Default width

        nextBtn.addEventListener("click", () => {
            if (currentSlide < totalCards - cardsPerView) {
                currentSlide += 2;
                movieCards.style.transform = `translateX(-${cardWidth * currentSlide}px)`;
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentSlide > 0) {
                currentSlide -= 2;
                movieCards.style.transform = `translateX(-${cardWidth * currentSlide}px)`;
            }
        });
    }, 200);
}



