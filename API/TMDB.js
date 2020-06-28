import config from '../config'

const API_TOKEN = config.api_key_tmdb;
const API_URL = 'https://api.themoviedb.org/3';
const API_URL_IMAGE = 'https://image.tmdb.org/t/p';

export function getMovies (filter) {
    const url = API_URL + '/movie/' + filter + '?api_key=' + API_TOKEN + '&language=fr&region=FR';
    console.log(url);
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
export function getSimilar (id) {
    const url = API_URL + '/movie/' + id + '/similar?api_key=' + API_TOKEN + '&language=fr&region=FR';
    console.log(url);
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
export function getMovieDetail (id) {
    const url = API_URL + '/movie/' + id + '?api_key=' + API_TOKEN + '&append_to_response=videos,images,credits,similar&language=fr&include_image_language=en,null';
    console.log(url);
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
export function GetActor (id) {
    const url = API_URL + '/person/' + id + '?api_key=' + API_TOKEN + '&append_to_response=videos,images,credits,similar&language=fr&include_image_language=en,null';
    console.log(url);
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
export function getImageFromApi (name, size = 'original') {
    return API_URL_IMAGE + ( (size != 'original') ? '/w' + size : '/original' ) +  name;
}

