document.addEventListener("DOMContentLoaded", function(){
    const searchbtn = document.getElementById("search-btn");
    let pokemonLabel;

searchbtn.onclick = function(){
    pokemonLabel = document.querySelector("#search").value

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonLabel}`)
    .then(res => {
        if (res.ok){
            console.log("sucess")
            res.json()
            .then(data => (console.log(data.name),console.log(data.sprites.front_default)))
        } else{
            console.log("not sucessfull")
        }
        
    })
    
}
})