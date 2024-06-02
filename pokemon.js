window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('pokemon');
    mostrarPokemon(id)
    animation()

}

var id_guardado;
const izquierda = document.querySelector('.izquierda')
const derecha = document.querySelector('.derecha')
var click_izquierda = true;
var click_derecha = true;

izquierda.addEventListener('click', function() {
    izquierda.disabled = true
    const contenedor_tipos = document.querySelector('.contenedor_tipos')
    contenedor_tipos.innerHTML = ''

    if(click_izquierda) {
        click_izquierda = false
        click_derecha = false
        animation()
        const id = parseInt(id_guardado)
        mostrarPokemon((id - 1))
        setTimeout(() => {
            click_izquierda = true
            click_derecha = true
            izquierda.disabled = false
        }, 1000)
    }

})

derecha.addEventListener('click', function() {
    
    derecha.disabled = true
    const contenedor_tipos = document.querySelector('.contenedor_tipos')
    contenedor_tipos.innerHTML = ''

    if(click_derecha) {
        click_derecha = false
        click_izquierda = false
        animation()
        const id = parseInt(id_guardado)
        mostrarPokemon((id + 1))
        setTimeout(() => {
            click_derecha = true
            click_izquierda = true
            derecha.disabled = false
        }, 1000)
    }
})

function animation() {
    const contenedor_img = document.querySelector('.contenedor_img')
    contenedor_img.classList.add('mostrar_img')
    const nombre = document.querySelector('.nombre')
    nombre.classList.add('mostrar_nombre')
    const id_text = document.querySelector('.id')
    id_text.classList.add('mostrar_nombre')
    const text_titulo = document.querySelector('.text_titulo')
    const text_descripcion = document.querySelector('.text_descripcion')
    text_titulo.classList.add('mostrar_descripcion')
    text_descripcion.classList.add('mostrar_descripcion')
    

    setTimeout(() => {
        contenedor_img.classList.remove('mostrar_img')
        nombre.classList.remove('mostrar_nombre')
        id_text.classList.remove('mostrar_nombre')
        text_titulo.classList.remove('mostrar_descripcion')
    text_descripcion.classList.remove('mostrar_descripcion')
    }, 1000);
}

function mostrarPokemon (id) {

    if(id >= 1 & id <= 1025) {
        id_guardado = id

    const promesas = []
    promesas.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json()))
        Promise.all(promesas)

        .then(data => {

            descripcion(id)
            data.forEach(data => {

                let id = ''
        
                    if(data.id <= 9) {
                        id = '#00' + data.id
                    } else if (data.id >= 10 & data.id <= 99) {
                        id = '#0' + data.id
                    } else {
                        id = '#' + data.id
                    }
    
                const card = document.querySelector('.card')
                const cont_id = document.querySelector('.id')
                const img = document.querySelector('.img')
                const nombre = document.querySelector('.nombre')
                const text_titulo = document.querySelector('.text_titulo')
                const contenedor_tipos = document.querySelector('.contenedor_tipos')

                if(data.types.length == 2) {
                    const tipo_uno = `<div class="tipo mostrar_tipo"><img src="assets/icon/${data.types[0].type.name}.png" alt="icon_tipo"></div>`
                    const tipo_dos = `<div class="tipo mostrar_tipo"><img src="assets/icon/${data.types[1].type.name}.png" alt="icon_tipo"></div>`
                    contenedor_tipos.insertAdjacentHTML("beforeend", tipo_uno)
                    contenedor_tipos.insertAdjacentHTML("beforeend", tipo_dos)
                } else {
                    const tipo_uno = `<div class="tipo mostrar_tipo"><img src="assets/icon/${data.types[0].type.name}.png" alt="icon_tipo"></div>`
                    contenedor_tipos.insertAdjacentHTML("beforeend", tipo_uno)
                }

                borrar_clase()
                text_titulo.classList.add(`text_titulo_${data.types[0].type.name}`)
                card.classList.add(data.types[0].type.name)
                cont_id.innerHTML = id
                img.src = data.sprites.other['official-artwork'].front_default
                nombre.textContent = data.name
            })
        })

        .catch(error => {
            console.log('Hubo un error:', error)
        })
    }
    
}

function borrar_clase() {

    const borrar = document.querySelector('.card')
    const text_titulo = document.querySelector('.text_titulo')
    const clases = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

    clases.forEach(element => borrar.classList.remove(element))
    clases.forEach(element => text_titulo.classList.remove(`text_titulo_${element}`))
}

function descripcion(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                .then(res => res.json())
                .then(data => {

                    const text_descripcion = document.querySelector('.text_descripcion')
                    const descripcion = []
                    const english = []
                    //const sinComa = español.map(coma => coma.replace(/\n/g, ' '))

                    data.flavor_text_entries.forEach(element => {
                        descripcion.push(element)
                    });

                    descripcion.forEach(txt => {
                        if(txt.language.name == 'en'){
                            english.push(txt.flavor_text)
                        }
                    })

                    //const random = Math.floor(Math.random() * español.length) + 1
                    //console.log(random)

                    //console.log(sinComa)
                    // console.log(español.map(coma => coma.replace(/\n/g, ' '))[random])
                    text_descripcion.textContent = english.map(coma => coma.replace(/\n/g, ' '))[0]
                })

                .catch(error => {
                    console.log('Hubo un error:', error)
                })
}