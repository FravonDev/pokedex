document.addEventListener("DOMContentLoaded", function(){
    
    //variable assignments
    const form = document.getElementById("form");
    let pokemonLabel;
    let pokemon;

    form.onsubmit = function(event){
        // disable the page refresh when submit the form
        event.preventDefault()
    
    pokemonLabel = document.querySelector("#search").value
    //fetch data from api
    // try{

    // } catch(error){
    //     alert("erro", err)
    // }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonLabel}`)
    .then(res => {
        if (res.ok){
            console.log("sucess")
            res.json()
            .then((data) => {
                pokemon = data;
                if (pokemon != undefined){
                    showPokemon(pokemon);
        
                }
            })
        } else{
            console.log("not sucessfull")
        }
        // verify if we have a pokemon after fetching the data
        
    })
}
});

function showPokemon(pokemon){
    if(typeof pokemon === 'object' && pokemon != undefined){
        const resultDiv = document.getElementById("results");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonImg = document.getElementById("pokemon-img");
        const pokemontype = document.getElementById("pokemon-type"); 


        pokemonName.innerHTML = pokemon.name;
        pokemonImg.src = `${pokemon.sprites.front_default}`;
        pokemontype.innerHTML = `${pokemon.types[0].type.name}`;
    
        resultDiv.append(pokemonName, pokemonImg, pokemontype);
        printPokemonStats(pokemon.stats);
        return resultDiv;

    }
}

function printPokemonStats(pokemonStats){
    // const statsDiv = document.getElementById("pokemon-stats");
    let divVar = document.getElementById("stats-container");
    if (divVar){
        divVar.remove();
    }
    let statsDiv = document.createElement("div");
    statsDiv.id = "stats-container";
    console.log(statsDiv);
    document.getElementById("results").append(statsDiv);

    
    for (let i = 0; i < pokemonStats.length; i++) {
        const pokeStatsBox = document.createElement("div");
        const pokeStatsName = document.createElement("p");
        const pokeStatsvalue = document.createElement("progress");
        const pokeStatsSpan = document.createElement("span");
        
        pokeStatsBox.className="stats-box";
        
        pokeStatsName.innerHTML = `${pokemonStats[i].stat.name}`;
        pokeStatsName.id = `${pokemonStats[i].stat.name}`;
        pokeStatsvalue.max = 100
        pokeStatsvalue.value = `${pokemonStats[i].base_stat}`;
        pokeStatsSpan.innerText = `${pokemonStats[i].base_stat}/100`;

        
       
        console.log(pokeStatsName)
        pokeStatsBox.appendChild(pokeStatsName);
        pokeStatsBox.appendChild(pokeStatsvalue);
        pokeStatsBox.appendChild(pokeStatsSpan);
        statsDiv.appendChild(pokeStatsBox);

    }
}

