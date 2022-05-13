// const urlBestMovie = "http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=&genre_contains=&imdb_score=9&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=2&rating=&rating_contains=&sort_by=votes&title=&title_contains=&writer=&writer_contains=&year="
const urlbestRatings = "http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&format=json&genre=&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year=&page=1&page_size=7"
const urlAction = "http://localhost:8000/api/v1/titles/?genre=Action&sort_by=votes&page=1&page_size=7"
const urlSciFi = "http://localhost:8000/api/v1/titles/?genre=Sci-Fi&sort_by=-votes&page=1&page_size=7"
const urlRomance = "http://localhost:8000/api/v1/titles/?genre=Romance&sort_by=votes&page=1&page_size=7"

/**
 * requete
 * @param {string} url 
 * @returns json
 */
 async function get(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json.results;
    } catch (err) {
        console.log(err);
    }
};
async function get_one(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (err) {
        console.log(err);
    }
};


 async function main(){
    //  const BestMovie = await get(urlBestMovie)
     const bestRatings = await get(urlbestRatings)
     const ActionMovies = await get(urlAction)
     const SciFiMovies = await get(urlSciFi)
     const RomanceMovies = await get(urlRomance)
    //  await loadCarousel("BestMovie", BestMovie)
     await loadCarousel("BestMovies", bestRatings)
     await loadCarousel("ActionMovies", ActionMovies)
     await loadCarousel("SciFiMovies",SciFiMovies)
     await loadCarousel("RomanceMovies",RomanceMovies)
    //  console.log("best movies",BestMovies)
    //  console.log("action",ActionMovies)
    //  console.log("scifi", SciFiMovies)
    //  console.log("Romance", RomanceMovies)
    
 }

function loadCarousel(category, movies_data){
// console.log(category)
   let movies_images = document.getElementsByClassName(category)[0].children
//    console.log(movies_images)
    
    movies_data.forEach((movie_data, index)=>{
        let movie_image = movies_images[index]
        movie_image.src = movie_data.image_url
        movie_image.onclick= async function(){
            await toggleModal(movie_data.id)
            // console.log(movie_data)
            // const modalTitle = document.querySelector('.modal-title')
            // modalTitle.innerHTML = "Titre : " + movie_data.title

            // const modalDirectors = document.querySelector('.modal-directors')
            // modalDirectors.innerHTML = "Directeurs : " + movie_data.directors
            
            // const modalActors = document.querySelector('.modal-actors')
            // modalActors.innerHTML = "Acteurs : " + movie_data.actors

            // const modalScore = document.querySelector('.imbd_score')
            // modalScore.innerHTML = "Score IMBD : " + movie_data.imdb_score

            // const modalYear = document.querySelector('modal-year')
            // modalYear.innerHTML = "Date de sortie : " + movie_data.year

            // const modalGenres = document.querySelector('modal-genres')
            // modalGenres.innerHTML = "Genre(s) : " + movie_data.genres

            

            // console.log("aaaaaaaa" + movie_data.genres)
            // console.log("aaaaaaaaaaaaaaaa" + movie_data.year)
            // console.log(movie_data.genre)
            // console.log(movie_data.id)
            // console.log(movie_data.url)
            // console.log(movie_data.title)
            // console.log(movie_data.imdb_score)
        }
    })

}

function previous(category) {
    let content = document.querySelector(".category");#fixe ici
    content.prepend(content.children.item(content.children.length - 1));
    update_carousel();
}

function next(category) {
    let content = document.querySelector(".category");
    content.append(content.children.item(0));
    update_carousel();
}


function update_carousel(category){
    let movies_images = [...document.getElementsByClassName(category)[0].children]
    movies_images.forEach((element, index)=>{
        if( index <= 4){
            element.style.display = 'block'
            // element.classList.add(".modal-trigger")
        }else{
            element.style.display = 'none'
        }
    })
}



//Modal window triggering
const modalContainer= document.querySelector(".modal-container")
const modaltriggers = document.querySelectorAll(".modal-trigger")

// modaltriggers.forEach(trigger => trigger.addEventListener("click", toggleModal()))

async function toggleModal(id){
    modalContainer.classList.toggle("active")
    console.log(id)
    const modalRequestUrl =  "http://localhost:8000/api/v1/titles/" + id
    
    const movie_data = await get_one (modalRequestUrl)
        console.log(movie_data)
    
    const modalTitle = document.querySelector('.modal-title')
            modalTitle.innerHTML = "Titre : " + movie_data.title

            const modalDirectors = document.querySelector('.modal-directors')
            modalDirectors.innerHTML = "Directeurs : " + movie_data.directors
            
            const modalActors = document.querySelector('.modal-actors')
            modalActors.innerHTML = "Acteurs : " + movie_data.actors

            const modalScore = document.querySelector('.imbd_score')
            modalScore.innerHTML = "Score IMBD : " + movie_data.imdb_score

            const modalYear = document.querySelector('.modal-year')
            modalYear.innerHTML = "Date de sortie : " + movie_data.year

            const modalGenres = document.querySelector('.modal-genres')
            modalGenres.innerHTML = "Genre(s) : " + movie_data.genre

}

window.addEventListener("DOMContentLoaded", main);
