const urlbestRatings = "http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&format=json&genre=&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year=&page=1&page_size=7"
const urlAction = "http://localhost:8000/api/v1/titles/?genre=Action&sort_by=votes&page=1&pagesize=7"
const urlSciFi = "http://localhost:8000/api/v1/titles/?genre=Sci-Fi&sort_by=-votes&page=1&page_size=7"
const urlRomance = "http://localhost:8000/api/v1/titles/?genre=Romance&sort_by=votes&page=1&pagesize=7"

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

 async function main(){
     const bestRatings = await get(urlbestRatings)
     const ActionMovies = await get(urlAction)
     const SciFiMovies = await get(urlSciFi)
     const RomanceMovies = await get(urlRomance)
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
        movie_image.src= movie_data.image_url
    })

}

// const items = document.querySelectorAll('img')
// const nbSlide = items.length
// const suivant = document.querySelector('.next')
// const precedent = document.querySelector('.prev')

function previous(category){
    let movies_images = [...document.getElementsByClassName(category)[0].children]
    console.log(movies_images)
    let movie_image = movies_images.pop()
    movies_images.unshift(movie_image)
    console.log(movies_images)
    // update_carousel(category)

}

function update_carousel(category){
    let movies_images = [...document.getElementsByClassName(category)[0].children]
    movies_images.forEach((element, index)=>{
        if( index <= 4){
            element.style.display = 'block'
        }else{
            element.style.display = 'none'
        }
    })
}

//Modal window triggering
const modalContainer= document.querySelector(".modal-container")
const modaltriggers = document.querySelectorAll(".modal-trigger")

modaltriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
    modalContainer.classList.toggle("active")
}


// let count = 0
// function slideSuivante(){
//     items[count].classList.remove('active')
//     if(count< nbSlide -1){
//         count++
//     }else{
//         count = 0
//     }
//     items[count].classList.add('active')
//     console.log(count)
// }
// suivant.addEventListener('click',slideSuivante)

// function slidePrecedent(){
//     items[count].classList.remove('active')
//     if(items[count]>0){
//         count--
//     } else{
//         count = nbSlide -1
//     }
//     items[count].classList.add('active')
//     console.log(count)
// }
// precedent.addEventListener('click', slidePrecedent)

window.addEventListener("DOMContentLoaded", main);
    