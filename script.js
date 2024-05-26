document.addEventListener('DOMContentLoaded', function () {
    const contenedor = document.querySelector('.contenedor')
    mostrarPokemon(1, 151)
    const kanto = document.getElementById('kanto')
    const johto = document.getElementById('johto')
    const hoenn = document.getElementById('hoenn')
    const sinnoh = document.getElementById('sinnoh')
    const unova = document.getElementById('unova')
    const kalos = document.getElementById('kalos')
    const alola = document.getElementById('alola')
    const galar = document.getElementById('galar')
    const paldea = document.getElementById('paldea')

    kanto.addEventListener('click', function() {
        contenedor.innerHTML = ''
        mostrarPokemon(1, 151)
    })

    johto.addEventListener('click', function() {
        contenedor.innerHTML = ''
        mostrarPokemon(152, 251)
    })

    hoenn.addEventListener('click', function() {
        contenedor.innerHTML = ''
        mostrarPokemon(252, 386)
    })

    sinnoh.addEventListener('click', function() {
        contenedor.innerHTML = ''
        mostrarPokemon(387, 493)
    })
    
    unova.addEventListener('click', function() {
        contenedor.innerHTML = ''
        mostrarPokemon(494, 649)
    })
    
    kalos.addEventListener('click', function() {
        contenedor.innerHTML = ''
        mostrarPokemon(650, 721)
    })
    
    alola.addEventListener('click', function() {
        contenedor.innerHTML = ''
        mostrarPokemon(722, 809)
    })

    galar.addEventListener('click', function() {
        contenedor.innerHTML = ''
        mostrarPokemon(810, 905)
    })

    paldea.addEventListener('click', function() {
        contenedor.innerHTML = ''
        mostrarPokemon(906, 1025)
    })

    function mostrarPokemon (inicio, fin) {
        const promesas = []
    
            for (let i = inicio; i <= fin; i++) {
    
                promesas.push(
                    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                    .then(res => res.json())
                )
            }

            Promise.all(promesas)
            
            .then(data => {
                data.forEach(data => {
                    tarjeta(data.id, data.name, data.types, data.height, data.weight)
                })
            })
            
            .catch(error => {
                console.log('Hubo un error:', error)
            })
        }





    // for (let i = inicio; i <= fin; i++) {

        //     fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         tarjeta(data.id, data.name, data.types, data.height, data.weight)
        //     })
        //     .catch(error => {
        //         console.log('Hubo un error:', error)
        //     })
        // }

})

function tarjeta(d_id, d_name, d_type, d_height, d_weight) {
    const contenedor = document.querySelector('.contenedor')
    let id = ''
    
                if(d_id <= 9) {
                    id = '00' + d_id
                } else if (d_id >= 10 & d_id <= 99) {
                    id = '0' + d_id
                } else {
                    id = d_id
                }

    if (d_type.length == 1) {
        const tarjeta =
                    `<div class="card card_${d_type[0].type.name}" id=${d_id}>
                        <div class="contenedor_img">
                            <p class="id">#${id}</p>
                            <img src=${`https://www.serebii.net/pokemongo/pokemon/${id}.png`} class="img_pokemon" alt="pokemon">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title nombre">${d_name}</h5>
                            <div class="contenedor_tipos">
                                <div class="${d_type[0].type.name}">${d_type[0].type.name}</div>
                            </div>
                            <div class="estadisticas">
                                <div class="altura">
                                    <p class="e_borde">altura</p>
                                    <p id="altura">${(d_height / 10)} m</p>
                                </div>
                                <div class="peso">
                                    <p class="e_borde">peso</p>
                                    <p id="kilos">${(d_weight / 10)} kg</p>
                                </div>
                            </div>
                            <a href="#" class="btn btn-primary boton">Mas detalles</a>
                        </div>
                    </div>
                    `
                contenedor.insertAdjacentHTML('beforeend', tarjeta)
    } else {
        const tarjeta =
                    `<div class="card card_${d_type[0].type.name}" id=${d_id}>
                        <div class="contenedor_img">
                            <p class="id">#${id}</p>
                            <img src=${`https://www.serebii.net/pokemongo/pokemon/${id}.png`} class="img_pokemon" alt="pokemon">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title nombre">${d_name}</h5>
                            <div class="contenedor_tipos">
                                <div class="${d_type[0].type.name}">${d_type[0].type.name}</div>
                                <div class="${d_type[1].type.name}">${d_type[1].type.name}</div>
                            </div>
                            <div class="estadisticas">
                                <div class="altura">
                                    <p class="e_borde">altura</p>
                                    <p id="altura">${(d_height / 10)} m</p>
                                </div>
                                <div class="peso">
                                    <p class="e_borde">peso</p>
                                    <p id="kilos">${(d_weight / 10)} kg</p>
                                </div>
                            </div>
                            <a href="#" class="btn btn-primary boton">Mas detalles</a>
                        </div>
                    </div>
                    `
                contenedor.insertAdjacentHTML('beforeend', tarjeta)
    }
}