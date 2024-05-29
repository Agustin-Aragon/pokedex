document.addEventListener('DOMContentLoaded', function () {

    const region = document.querySelectorAll('.region')
    const filtro = document.querySelectorAll('.btn-filtro')

    mostrarPokemon(1, 151)

    region.forEach(btn => btn.addEventListener('click', Event => {
        const region = Event.currentTarget.id

        switch (region) {
            case 'todos':
            mostrarPokemon(1, 1025)
            break;
            case 'kanto':
                mostrarPokemon(1, 151)
            break;
            case 'johto':
                mostrarPokemon(152, 251)
            break;
            case 'hoenn':
                mostrarPokemon(252, 386)
            break;
            case 'sinnoh':
                mostrarPokemon(387, 493)
            break;
            case 'unova':
                mostrarPokemon(494, 649)
            break;
            case 'kalos':
                mostrarPokemon(650, 721)
            break;
            case 'alola':
                mostrarPokemon(722, 809)
            break;
            case 'galar':
                mostrarPokemon(810, 905)
            break;
            case 'paldea':
                mostrarPokemon(906, 1025)
            break;
        }
    }))

    filtro.forEach(btn => btn.addEventListener('click', Event => {
        const filtro_tipo = Event.currentTarget.id

            const tarjeta = document.querySelectorAll('.card')
            const ocultar_tarjetas = document.querySelectorAll('.card')
            const sin_filtro = document.querySelectorAll('.card')

            ocultar_tarjetas.forEach(ocultar => {
                ocultar.style.display = 'none'
            })

            tarjeta.forEach(tarjeta => {
                const tipos = tarjeta.querySelectorAll('.tipo')
                tipos.forEach(tipo => {
                    if(tipo.classList.contains(filtro_tipo)) {
                        tarjeta.style.display = ''
                    }
                })
            })
            
            if(filtro_tipo.includes('todos')) {
                sin_filtro.forEach(filtro => {
                    filtro.style.display = ''
                })
            }
        }))
})

function mostrarPokemon (inicio, fin) {
    const contenedor = document.querySelector('.contenedor')
    contenedor.innerHTML = ''
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

    let tipo = d_type.map(type => `<div class="tipo ${type.type.name}">${type.type.name}</div>`)

        const tarjeta =
                    `<div class="card ${d_type[0].type.name}" id="${d_id}">
                        <div class="contenedor_img">
                            <p class="id">#${id}</p>
                            <img src=${`https://www.serebii.net/pokemongo/pokemon/${id}.png`} class="img_pokemon" alt="pokemon">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title nombre">${d_name}</h5>
                            <div class="contenedor_tipos">
                                ${tipo}
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