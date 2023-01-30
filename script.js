// https://superheroapi.com/

const TOKEN_ID = "10223569763528853";
const BASE_URL = `https://superheroapi.com/api.php/${TOKEN_ID}`;

const newHeroButton = document.getElementById("newHeroButton");

const heroImageDiv = document.createElement("div");
heroImageDiv.classList.add("heroImage");
document.body.appendChild(heroImageDiv);
const searchButton = document.getElementById("searchButton");

const searchInput = document.getElementById("searchInput");
// allows press enter to search
searchInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		searchButton.click();
	}
});

// to fetch superhero object based on unique id
const getSuperHero = (id) => {
	fetch(`${BASE_URL}/${id}`)
		.then((response) => response.json())
		.then((json) => {
			console.log(json.powerstats);
			const superHero = json;
			showHeroInfo(superHero);
		});
};

//assigning emojis to display with respective keys
const statToEmoji = {
	intelligence: "🧠",
	strength: "💪",
	speed: "⚡",
	durability: "🏋️‍♂️",
	power: "📊",
	combat: "⚔️",
};

//accessing object and updating the DOM
const showHeroInfo = (character) => {
	const name = `<h2>${character.name}</h2>`;

	const img = `<img src="${character.image.url}" />`;

	const stats = Object.keys(character.powerstats)
		.map((stat) => {
			// console.log(typeof character.powerstats[stat]);
			//to check if stats exist for given key
			if (character.powerstats[stat] === "null") {
				return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: 
                Unavailable
                </p>`;
			} else {
				return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${
					character.powerstats[stat]
				}</p>`;
			}
		})
		.join("");

	heroImageDiv.innerHTML = `${name}${img}${stats}`;
};

// to fetch superhero object based on name provided by user
const getSearchSuperHero = (name) => {
	fetch(`${BASE_URL}/search/${name}`)
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			const hero = json.results[0];
			console.log(typeof hero);
			showHeroInfo(hero);
		});
};

//random number to be passed for the search by id function
const randomHero = () => {
	const numberOfHeroes = 731;
	return Math.floor(Math.random() * numberOfHeroes) + 1;
};

newHeroButton.onclick = () => getSuperHero(randomHero());

searchButton.onclick = () => getSearchSuperHero(searchInput.value);
