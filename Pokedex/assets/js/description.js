const button1 = document.getElementById('Sobre');
const button2 = document.getElementById('Status');
const containerSobre = document.getElementById('infos');
const containerGraf = document.getElementById('infosGraf');
const paginaExibicao = document.getElementById('DescricaoContent')
const detalhesCima = document.getElementById('detalhes')

function loadPokemons(pokeName) {
    pokeApiInfos.getPokemon(pokeName).then((pokemon) => {
        detalhesCima.classList.add(pokemon.type);
        const HTML =
            `<a id="return" href="index.html">Voltar</a>
            <p class="PokeId">${pokemon.number}</p>
            <h1 class="PokeName">${pokemon.name}</h1>
            <ol class="tipagem">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">`;

        const HTMLinfos =
            `<section class="sobreDetalhes">
                <ol class="titulosDetalhes1">
                    <li>Height</li>
                    <li>Weight</li>
                    <li>Abilities</li>
                </ol>
                <ol class="infosApi">
                    <li>${pokemon.height}</li>
                    <li>${pokemon.weight}</li>
                    <li>${pokemon.abilities.join(', ')}</li>
                </ol>
            </section>
                <h2>Breeding</h2>
            <section class="sobreDetalhes">
                    <ol class="titulosDetalhes1">
                        <li>Gender</li>
                        <li>Egg groups</li>
                    </ol>
                    <ol class="infosApi">
                        <li>${pokemon.gender}</li>
                        <li>${pokemon.egg.join(', ')}</li>
                    </ol>
            </section>`;
        
        const HTMLGraf = 
            `<section class="sobreDetalhes1">
                <div class="sobreDetalhes">
                <ol class="titulosDetalhes">
                        <li>HP</li>
                        <li>Attack</li>
                        <li>Defense</li>
                        <li>Sp. Atk</li>
                        <li>Sp. Def</li>
                        <li>Speed</li>
                        <li><b><i>Total</i></b></li>
                </ol>
                <ol class="infosApi">
                    <li>${pokemon.hp}</li>
                    <li>${pokemon.atk}</li>
                    <li>${pokemon.def}</li>
                    <li>${pokemon.spatk}</li>
                    <li>${pokemon.spdef}</li>
                    <li>${pokemon.speed}</li>
                    <li><b><i>${pokemon.total}</i></b></li>
                </ol>
                </div>
                <ol class="ListaBarras">
                    <li id="b1" class="barraV"></li>
                    <li id="b2" class="barra"></li>
                    <li id="b3" class="barraV"></li>
                    <li id="b4" class="barra"></li>
                    <li id="b5" class="barraV"></li>
                    <li id="b6" class="barra"></li>
                    <li id="b7" class="barraV"></li>
                </ol>
            </section>`
        
        detalhesCima.innerHTML = HTML;
        containerSobre.innerHTML = HTMLinfos;
        containerGraf.innerHTML = HTMLGraf;

        const Barrahp = document.getElementById('b1')
        const BarraAtk = document.getElementById('b2')
        const BarraDef = document.getElementById('b3')
        const BarraSpAtk = document.getElementById('b4')
        const BarraSpDef = document.getElementById('b5')
        const BarraSpeed = document.getElementById('b6')

        Barrahp.style.width = `${pokemon.hp-10}px`
        BarraAtk.style.width = `${pokemon.atk-10}px`
        BarraDef.style.width = `${pokemon.def-10}px`
        BarraSpAtk.style.width = `${pokemon.spatk-10}px`
        BarraSpDef.style.width = `${pokemon.spdef-10}px`
        BarraSpeed.style.width = `${pokemon.speed-10}px`
    }) 
}

loadPokemons(pokeName)

//Lógica para navegação entre os detalhes do pokemon
button1.addEventListener("click", () => {
    if (button2.classList.contains("ativo")) {
        button2.classList.remove("ativo")
        containerGraf.classList.add("sumir")
        containerSobre.classList.remove("sumir")
        button1.classList.add("ativo")
    } else {
        button1.classList.add("ativo")  
    }
  })
button2.addEventListener("click", () => {
    if (button1.classList.contains("ativo")) {
        button1.classList.remove("ativo")
        containerSobre.classList.add("sumir")
        containerGraf.classList.remove("sumir")
        button2.classList.add("ativo")    
    } else {
        button2.classList.add("ativo")  
    }
})
//Fim da lógica
