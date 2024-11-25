const searchMovieForm = document.querySelector("#searchMovieForm");

searchMovieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = document.querySelector("#searchMovie");
    fetchMovieData(search.value);
});

const fetchMovieData = async (search) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=addb359d`);
        const data = await response.json();

        if (data.Search && data.Search.length > 0) {
            console.log(data.Search[0].Title);
            cloneData(data.Search); // Pass the entire array
        } else {
            throw new Error("No movies found");
        }
    } catch (error) {
        let perentCard = document.querySelector(".perent-card");
        perentCard.innerHTML = "<h1>Oops... Not Found</h1>";
    }
};

const cloneData = (movies) => {
    let perentCard = document.querySelector(".perent-card");
    let templateCard = document.querySelector("#card-template"); // Correct ID
    perentCard.innerHTML = "";
    movies.forEach((movie) => {
        if (movie.Poster === "N/A") return;
        let clone = templateCard.content.cloneNode(true);
        makeCard(clone, movie);
        perentCard.appendChild(clone);
    });
};

const makeCard = (clone, movie) => {
    let cloneImage = clone.querySelector(".card-image");
    let cloneTitle = clone.querySelector("#title span");
    let cloneYear = clone.querySelector("#year span");
    let cloneType = clone.querySelector("#type span");

    cloneImage.src = movie.Poster;
    cloneTitle.innerHTML = movie.Title;
    cloneYear.innerHTML = movie.Year;
    cloneType.innerHTML = movie.Type.toUpperCase();
};
