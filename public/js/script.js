/*
 npx nodemon
sass --watch scss/busqueda.scss:public/css/style.css
*/


// Algunas variables y arrays

let arrayPokemon = [];
let arrayPokemonPro = [];
let rellenar = [];
const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";

// Esta es la funcion de filtrado de pokemons

function filtroLetra(elemento) {
    let letra = document.querySelector(`input[name="buscar"]`).value;
    return elemento.name.startsWith(letra);
}

function buscar() {
    //console.log(arrayPokemon[0]);
    // const fetchPromesa = fetch(pokemonUrl);
    let pokemonDiv;
    let nombrePokemon;
    let imgPokemon;
    let idPokemon;
    let tipoPokemon;
    let tipos;
    rellenar = arrayPokemon.filter(filtroLetra);
    document.querySelector(".resultados").innerHTML = "";

    rellenar.forEach(pokemon => {
        //console.log(pokemon);

        // Creamos el div de cada pokemon
        pokemonDiv = document.createElement("div");
        pokemonDiv.classList.add("pokemon");

        // Creamos la imagen de cada Pokemon
        imgPokemon = document.createElement("img");
        imgPokemon.setAttribute("src", pokemon.sprites.front_default);
        imgPokemon.classList.add("imgPokemon");

        //Creamos el elemento P para el nombre del Pokemon
        nombrePokemon = document.createElement("p");
        nombrePokemon.innerText = pokemon.name;
        nombrePokemon.style.textTransform = "uppercase";

        // Creamos el elemento P del numero del Pokemón
        idPokemon = document.createElement("p");
        idPokemon.classList.add("idPokemon");
        idPokemon.innerText = "#" + pokemon.id;

        //Creamos otro div para los tipos del pokemon
        tipos = document.createElement("div");
        tipos.classList.add("tipos");
        //tipos.style.backgroundColor = "red";

        //Creamos el elemento P del tipo del Pokemon
        tipoPokemon = document.createElement("p");
        tipoPokemon.innerText = pokemon.types[0].type.name;
        tipoPokemon.style.textTransform = "uppercase";
        tipoPokemon.classList.add("tipoPokemon");


        // Lo añadimos al div de cada Pokemon
        pokemonDiv.appendChild(tipos);
        pokemonDiv.appendChild(imgPokemon);
        pokemonDiv.appendChild(nombrePokemon);
        pokemonDiv.appendChild(idPokemon);
        tipos.appendChild(tipoPokemon);
        document.querySelector(".resultados").appendChild(pokemonDiv);
    });

}

// FUNCION DE PROMESAS PARA LOS POKEMONS
function promesaPokemon(url) {
    return fetch(url).then(res => res.json()).then(resp => {

        return resp;
    });

}

function init() {

    // Evento en el boton de buscar 
    document.querySelector(`input[type="button"]`).addEventListener("click", buscar);

    const fetchPromesa = fetch(pokemonUrl);
    fetchPromesa.then(response => {
        return response.json();
    }).then(respuesta => {

        respuesta.results.forEach(pokemon => {
            arrayPokemonPro.push(promesaPokemon(pokemon.url));

        });

        Promise.all(arrayPokemonPro).then(pokemon => {
            arrayPokemon.push(...pokemon);

        });


    });

}

// The mother of the lamb.
window.onload = init;