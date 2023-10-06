function createCards(img, name) {
    const divPokedex = document.createElement("div");
    const imgPokemon = document.createElement("img");
    const h3Name = document.createElement("h3"); 

    divPokedex.classList.add("pokedex");
    imgPokemon.classList.add("pokedex--img");
    h3Name.classList.add("pokedex--name");

    imgPokemon.src = img;
    h3Name.innerText = name;

    divPokedex.append(imgPokemon, h3Name);

    return divPokedex;
}

function renderCards (img, name) {
    const divCards = document.querySelector(".cards");

    const render = createCards(img, name);

    divCards.append(render)

    return divCards
}