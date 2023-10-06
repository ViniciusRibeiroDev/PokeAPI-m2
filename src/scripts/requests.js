const loading = document.querySelector(".loading");
const cards = document.querySelector(".cards");

const inputSearch = document.querySelector(".search--input");
const buttonSearch = document.querySelector(".search--button");

async function getAllPokemons() {
  const pokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((error) => console.log(error));

  return pokemons.results;
}

const pokemons = await getAllPokemons();

async function getAllPokemonsImg(url) {
  const pokemonImg = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((error) => console.log(error));

  return pokemonImg.sprites.front_default;
}

function renderImgName(arrayPokemons) {
  let contPokemons = 0

  arrayPokemons.forEach(async (pokemon) => {
    const img = await getAllPokemonsImg(pokemon.url);
    contPokemons++
    renderCards(img, `${contPokemons} - ${pokemon.name}`)
  });

  loading.style.display = "none";
  cards.style.display = "flex";
}
setTimeout(() => {
  renderImgName(pokemons);
}, 2000);

function seachRender() {
  buttonSearch.addEventListener("click", async (e) => {
    e.preventDefault();
    const input = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${inputSearch.value}?limit=100000&offset=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => resp);

    const divCards = document.querySelector(".cards");

    divCards.innerHTML = "";

    loading.style.display = "none";
    cards.style.display = "flex";

    const img = input.sprites.front_default;
    const name = input.forms[0].name;

    renderCards(img, name);
  });
}

seachRender();
