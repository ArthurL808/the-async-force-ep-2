const container = document.getElementById("contentContainer");
const input = document.getElementById("resourceId");
const reqButton = document.getElementById("requestResourceButton");
const selector = document.getElementById("resourceType");

function api(value, select) {
  value = input.value;
  select = selector.value;
  const req = new XMLHttpRequest();
  if (select === "people") {
    req.addEventListener("load", function() {
      if (this.status === 404) {
        return alert(`Error: Not Found`);
      }
      container.innerHTML = "";
      let responseText = JSON.parse(this.responseText);
      let name = document.createElement("h2");
      name.innerHTML = `Name: ${responseText.name}`;
      let gender = document.createElement("p");
      gender.innerHTML = `Gender: ${responseText.gender}`;
      container.appendChild(name);
      container.appendChild(gender);
      const speciesReq = new XMLHttpRequest();
      speciesReq.addEventListener("load", function() {
        let responseText = JSON.parse(this.responseText);
        let species = document.createElement("p");
        species.innerHTML = `Species: ${responseText.name}`;
        container.appendChild(species);
      });
      speciesReq.open("GET", responseText.species);
      speciesReq.send();
    });
  } else if (select === "planets") {
    req.addEventListener("load", function() {
      if (this.status === 404) {
        return alert(`Error: Not Found`);
      }
      container.innerHTML = "";
      let responseText = JSON.parse(this.responseText);
      let name = document.createElement("h2");
      name.innerHTML = `Name: ${responseText.name}`;
      container.appendChild(name);
      let terrain = document.createElement("p");
      terrain.innerHTML = `Terrain: ${responseText.terrain}`;
      container.appendChild(terrain);
      let population = document.createElement("p");
      population.innerHTML = `Population: ${responseText.population}`;
      container.appendChild(population);
      let filmList = document.createElement("ul");
      filmList.innerHTML = "Films:";
      for (let i = 0; i < responseText.films.length; i++) {
        const filmReq = new XMLHttpRequest();
        filmReq.addEventListener("load", function() {
          let responseText = JSON.parse(this.responseText);
          container.appendChild(filmList);
          let films = document.createElement("li");
          films.innerHTML = responseText.title;
          filmList.appendChild(films);
        });
        filmReq.open("Get", responseText.films[i]);
        filmReq.send();
      }
    });
  } else if (select === "starships") {
    req.addEventListener("load", function() {
      if (this.status === 404) {
        return alert(`Error: Not Found`);
      }
      container.innerHTML = "";
      let responseText = JSON.parse(this.responseText);
      let name = document.createElement("h2");
      name.innerHTML = `Name: ${responseText.name}`;
      container.appendChild(name);
      let manufacturer = document.createElement("p");
      manufacturer.innerHTML = `Manufacturer: ${responseText.manufacturer}`;
      container.appendChild(manufacturer);
      let starshipClass = document.createElement("p");
      starshipClass.innerHTML = `Starship Class: ${
        responseText.starship_class
      }`;
      container.appendChild(starshipClass);
      let filmList = document.createElement("ul");
      filmList.innerHTML = "Films:";
      for (let i = 0; i < responseText.films.length; i++) {
        const filmReq = new XMLHttpRequest();
        filmReq.addEventListener("load", function() {
          let responseText = JSON.parse(this.responseText);
          container.appendChild(filmList);
          let films = document.createElement("li");
          films.innerHTML = responseText.title;
          filmList.appendChild(films);
        });
        filmReq.open("Get", responseText.films[i]);
        filmReq.send();
      }
    });
  }
  req.open("GET", `https://swapi.co/api/${select}/${value}/`);
  req.send();
}
reqButton.addEventListener("click", api);
