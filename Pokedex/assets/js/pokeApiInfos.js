
const pokeApiInfos = {}
const pokeName = localStorage.getItem('pokeName');

function converteEmPoke(pokeDetail) {
    const pokemon = new Pokemon();
    let altura = pokeDetail.jsonBody.height;
    let peso = pokeDetail.jsonBody.weight;

    pokemon.number = pokeDetail.jsonBody.id;
    pokemon.name = pokeDetail.jsonBody.name;
    pokemon.photo = pokeDetail.jsonBody.sprites.other.dream_world.front_default;

    const types = pokeDetail.jsonBody.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    //Valida altura do Poke
    if (altura < 10) {
        pokemon.height = "0." + altura + "0cm"
    } else if (altura.toString().endsWith('0')) {
        pokemon.height = altura.toString().slice(0, -1) + "m"
    } else if (altura > 10 && altura < 100) {
        pokemon.height = altura.toString().charAt(0) + "." + altura.toString().charAt(1) + "m" 
    } else {
        pokemon.height = altura.toString().slice(0,2) + "." + altura.toString().charAt(altura.toString().length - 1) + "m"
    }//Encerra validação
    //valida peso do Poke
    if (peso < 10) {
        pokemon.weight = "0." + peso + "00g"
    } else if (peso > 10 && peso < 100) {
        pokemon.weight = peso.toString().charAt(0) + "." + peso.toString().charAt(1) + "kg" 
    } else if (peso.toString().endsWith('0')) {
        pokemon.weight = peso.toString().slice(0, -1) + "kg"
    } else if (peso >= 100 && peso < 1000) {
        pokemon.weight = peso.toString().slice(0,2) + "." + peso.toString().charAt(2) + "kg" 
    } else if ((peso > 1000 && peso < 10000)){
        pokemon.weight = peso.toString().slice(0,3) + "." + peso.toString().charAt(3) + "T"
    } //Encerra validação
    
    const abilities = pokeDetail.jsonBody.abilities.map((ability) => ability.ability.name)
    pokemon.abilities = abilities.map((ability) => ability.charAt(0).toUpperCase() + ability.slice(1))
    
    const gender_rate = pokeDetail.species.gender_rate * 12.5;
    const gender_masc = 100 - gender_rate;
    pokemon.gender = `${gender_rate}%F ${gender_masc}%M`
    
    const eggGroups = pokeDetail.species.egg_groups.map((group) => group.name)
    pokemon.egg = eggGroups.map((group) => group.charAt(0).toUpperCase() + group.slice(1))
    
    pokemon.hp = pokeDetail.jsonBody.stats[0].base_stat;
    pokemon.atk = pokeDetail.jsonBody.stats[1].base_stat;
    pokemon.def = pokeDetail.jsonBody.stats[2].base_stat;
    pokemon.spatk = pokeDetail.jsonBody.stats[3].base_stat;
    pokemon.spdef = pokeDetail.jsonBody.stats[4].base_stat; 
    pokemon.speed = pokeDetail.jsonBody.stats[5].base_stat;
    pokemon.total = pokemon.hp + pokemon.atk + pokemon.def + pokemon.spatk + pokemon.spdef + pokemon.speed;

    return pokemon
}


pokeApiInfos.getPokemon = (pokeName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    const url2 = `https://pokeapi.co/api/v2/pokemon-species/${pokeName}`

    const speciesPromise = fetch(url2).then((response) => response.json())

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => {
            return speciesPromise.then((jsonSpecies) => {
                const jsonCompleto = {
                  jsonBody: jsonBody,
                  species: jsonSpecies
                };
                console.log(jsonCompleto)

                return converteEmPoke(jsonCompleto);
              });
            })
}
    