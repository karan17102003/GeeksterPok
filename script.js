let pokemonselect = document.getElementById("pokemonselect");
let mainbox = document.getElementById("mainbox");
let arr = [];

fun();
async function fun() {
  let response = await fetch("https://pokeapi.co/api/v2/type/");
  let parsedResponse = await response.json();
  let m = 0;
  parsedResponse.results.forEach((element) => {
    if (m <= 17) {
      let option = document.createElement("option");
      option.innerText = element.name;

      arr.push({
        name: element.name,
        url: element.url,
      });

      pokemonselect.appendChild(option);
    }
    m++;
  });
}

let fillerbtn = document
  .getElementById("fillerbtn")
  .addEventListener("click", () => {
    mainbox.innerHTML = "";
    let count = 0;
    let x = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === pokemonselect.value) {
        x = i;
      }
    }

    fetch(arr[x].url)
      .then((response) => response.json())
      .then((parsedResponse) => {
        for (let i = 0; i < parsedResponse.pokemon.length; i++) {
          let url = parsedResponse.pokemon[i];
          fetch(url.pokemon.url)
            .then((response) => response.json())
            .then((parsedResponse) => {
              let map = parsedResponse.abilities.map((e) => {
                return e.ability.name;
              });

              let types = parsedResponse.types[0];
              printdata(parsedResponse, types, map);
            });
        }
      });
  });

async function show() {
  mainbox.innerHTML = "";
  let count = 0;
  for (let i = 1; i <= 15; i++) {
    let response = await fetch(`https://pokeapi.co/api/v2/type/${i}/`);
    let parsedResponse = await response.json();
    for (let j = 0; j < 4; j++) {
      let pokemon = parsedResponse.pokemon[j];
      fetch(pokemon.pokemon.url)
        .then((response) => response.json())
        .then((parsedResponse) => {
          let map = parsedResponse.abilities.map((e) => {
            return e.ability.name;
          });
          let types = parsedResponse.types[0];
          let box = document.createElement("div");
          box.setAttribute("id", types.type.name);

          box.classList.add("flip-card");
          let innerbox = document.createElement("div");

          innerbox.classList.add("flip-card-inner");
          let box1 = document.createElement("div");

          box1.setAttribute("id", "box1");
          box1.classList.add("flip-card-front");

          let box2 = document.createElement("div");
          box2.classList.add("flip-card-back");
          box2.setAttribute("id", types.type.name);
          let img2 = document.createElement("img");
          img2.src = parsedResponse.sprites.front_default;
          img2.setAttribute("width", "96px");
          img2.setAttribute("height", "96px");
          let name2 = document.createElement("h2");
          name2.innerText = parsedResponse.name;
          let para2 = document.createElement("p");

          let str = "";
          map.forEach((val) => {
            str += val + ",";
          });
          para2.innerText = "Abilities:" + str.slice(0, str.length - 1);

          let top = document.createElement("p");
          top.innerText = "#" + parsedResponse.id;
          top.classList.add("top");
          let img = document.createElement("img");
          img.src = parsedResponse.sprites.front_default;
          img.setAttribute("width", "96px");
          img.setAttribute("height", "96px");
          let h2 = document.createElement("h2");
          h2.innerText = parsedResponse.name;
          let p = document.createElement("p");
          p.classList.add("para");
          console.log(parsedResponse);
          p.innerText = parsedResponse.types[0].type.name;
          box1.append(top, img, h2, p);
          innerbox.append(box1, box2);
          box2.append(img2, name2, para2);
          box.appendChild(innerbox);
          mainbox.appendChild(box);
        });
    }
  }
}

let reset = document.getElementById("reset").addEventListener("click", () => {
  show();
});

function printdata(parsedResponse, types, map) {
  let box = document.createElement("div");
  box.setAttribute("id", pokemonselect.value);
  box.classList.add("flip-card");
  let innerbox = document.createElement("div");
  innerbox.classList.add("flip-card-inner");
  let box1 = document.createElement("div");
  box1.setAttribute("id", "box1");
  box1.classList.add("flip-card-front");

  let box2 = document.createElement("div");
  box2.classList.add("flip-card-back");
  box2.setAttribute("id", pokemonselect.value);
  let img2 = document.createElement("img");
  img2.src = parsedResponse.sprites.front_default;
  img2.setAttribute("width", "96px");
  img2.setAttribute("height", "96px");
  let name2 = document.createElement("h2");
  name2.innerText = parsedResponse.name;
  let para2 = document.createElement("p");

  let str = "";
  map.forEach((val) => {
    str += val + ",";
  });
  para2.innerText = "Abilities:" + str.slice(0, str.length - 1);
  let top = document.createElement("p");
  top.innerText = "#" + parsedResponse.id;
  top.classList.add("top");
  let img = document.createElement("img");
  img.src = parsedResponse.sprites.front_default;
  img.setAttribute("width", "96px");
  img.setAttribute("height", "96px");
  let h2 = document.createElement("h2");
  h2.innerText = parsedResponse.name;
  let p = document.createElement("p");
  p.classList.add("para");
  p.innerText = pokemonselect.value;
  box1.append(top, img, h2, p);
  innerbox.append(box1, box2);
  box2.append(img2, name2, para2);
  box.appendChild(innerbox);
  mainbox.appendChild(box);
}

inp.addEventListener("keyup", () => {
  searchPokemon(inp.value.trim().toLowerCase());
  if (inp.value == 0) {
    show();
  }
});

async function searchPokemon(pokemonName) {
  mainbox.innerHTML = "";

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error("Pokemon not found");
    }
    const pokemonData = await response.json();
    displayPokemon(pokemonData);
  } catch (error) {
    console.error(error);
  }
}

function displayPokemon(pokemonData) {
  const box = document.createElement("div");
  box.classList.add("flip-card");

  const innerbox = document.createElement("div");
  innerbox.classList.add("flip-card-inner");

  const box1 = document.createElement("div");
  box1.setAttribute("id", pokemonData.types[0].type.name);
  box1.classList.add("flip-card-front");

  const box2 = document.createElement("div");
  box2.classList.add("flip-card-back");
  box2.setAttribute("id", pokemonData.types[0].type.name);

  const img2 = document.createElement("img");
  img2.src = pokemonData.sprites.front_default;
  img2.setAttribute("width", "96px");
  img2.setAttribute("height", "96px");

  const name2 = document.createElement("h2");
  name2.innerText = pokemonData.name;

  const para2 = document.createElement("p");
  const abilities = pokemonData.abilities
    .map((ability) => ability.ability.name)
    .join(", ");
  para2.innerText = "Abilities: " + abilities;

  const top = document.createElement("p");
  top.innerText = "#" + pokemonData.id;
  top.classList.add("top");

  const img = document.createElement("img");
  img.src = pokemonData.sprites.front_default;
  img.setAttribute("width", "96px");
  img.setAttribute("height", "96px");

  const h2 = document.createElement("h2");
  h2.innerText = pokemonData.name;

  const p = document.createElement("p");
  p.classList.add("para");
  p.innerText = pokemonData.types[0].type.name;

  box1.append(top, img, h2, p);
  innerbox.append(box1, box2);
  box2.append(img2, name2, para2);
  box.appendChild(innerbox);
  mainbox.appendChild(box);
}