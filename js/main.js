const listPokemon = document.querySelector("#listPokemon");
const buttonsHeader = document.querySelectorAll(".btn-header");
let URL_API = "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemon(url) {
    const response = await fetch(url);
    return await response.json();
}

async function fetchAndShowAllPokemons() {
    listPokemon.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
        const pokemon = await fetchPokemon(URL_API + i);
        showPokemon(pokemon);
    }
}

async function fetchAndShowFilteredPokemons(type) {
    listPokemon.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
        const pokemon = await fetchPokemon(URL_API + i);
        const types = pokemon.types.map((type) => type.type.name);
        if (type === "ver-todos" || types.includes(type)) {
            showPokemon(pokemon);
        }
    }
}

function showPokemon(poke) {
    let types = poke.types.map(
        (type) => `<p class="${type.type.name} type">${type.type.name}</p>`
    );
    types = types.join("");

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-image">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="name-container">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-name">${poke.name}</h2>
            </div>
            <div class="pokemon-type">
                ${types}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listPokemon.append(div);
}

buttonsHeader.forEach((button) =>
    button.addEventListener("click", async (event) => {
        const buttonId = event.currentTarget.id;

        listPokemon.innerHTML = "";

        if (buttonId === "ver-todos") {
            await fetchAndShowAllPokemons();
        } else {
            await fetchAndShowFilteredPokemons(buttonId);
        }
    })
);
