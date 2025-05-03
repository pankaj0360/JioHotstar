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
    await fetch("/movie.json")
    .then(response => response.json())
    .then(data => {
        loadMovies("Comedy_Carnival", data.Comedy_Carnival, "comedy-container");
       
        
        loadMovies("Latest_Releases", data.Latest_Releases, "latest-container");
        loadMovies("Team_Marvel_And_Team_DC", data.Team_Marvel_And_Team_DC, "Super-container");
        loadMovies("Popular_in_Biopic", data.Popular_in_Biopic, "Biopic-container");
        loadMovies("Action_Movies", data.Action_Movies, "Action_Movies-container");
        loadMovies("Popular_Shows", data.Popular_Shows, "Shows-container");
        loadChannel("News_Channel", data.News_Channel, "News-container");
    
    
        // Wait for DOM update, then initialize sliders
        
        document.querySelectorAll(".slider-container").forEach(slider => initializeSlider(slider));
        
    });
    
    
});

function loadMovies(category, movies, containerId) {
    const container = document.getElementById(containerId);
    const movieHTML = movies.map(movie => `
        <div class="movie-cardd">
            <img 
                src="${movie.image}" 
                alt="${movie.title}" 
                onclick="window.location.href='/user/movieShow?title=${encodeURIComponent(movie.title)}'"
                style="aspect-ratio: 19/6;"
            />
        </div>
    `).join(""); 
    container.innerHTML = movieHTML;
}
function loadChannel(category, movies, containerId) {
    const container = document.getElementById(containerId);
    const movieHTML = movies.map(movie => `
        <div class="movie-cardd">
            <img 
                src="${movie.image}" 
                alt="${movie.title}" 
                onclick="window.location.href='https://www.youtube.com/embed/live_stream?channel=${movie.channelId}&autoplay=1'"
                style="aspect-ratio: 19/6;"
            />
        </div>
    `).join(""); 
    container.innerHTML = movieHTML;
}
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



