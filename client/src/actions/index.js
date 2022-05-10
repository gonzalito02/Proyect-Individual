import axios from "axios";

//trae los pokemons
export function getPokemons() {

    return async function(dispatch) {
        
        try {    
        const pokes = await axios.get("http://localhost:3001/pokemons", {})
        return dispatch({
            type: "GET_POKEMONS",
            payload: pokes.data
        })
        } catch (e) {
            if (e.code === "ERR_BAD_REQUEST") return alert("Verificar la conexión a Internet")
            else (alert(e.code))
        }
    }
}

//trae los pokemons
export function getTypes() {
    return async function(dispatch) {
        try {
        const pokes = await axios.get("http://localhost:3001/types", {})
        return dispatch({
            type: "GET_TYPES",
            payload: pokes.data
        })
        } catch (e) {
            if (e.code === "ERR_BAD_REQUEST") return alert("Verificar la conexión a Internet")
            else (alert(e.code))
        }
    }
}

export function getNamePokemon(name) {
    
    return async function (dispatch){
    
        try {
        
            const poke = await axios.get(`http://localhost:3001/pokemon?name=${name}`, {})
            return dispatch({
                type:"GET_POKEMON_NAME",
                payload: poke.data
            })

        } catch (e) {
            alert("No existe Pokemon con ese nombre. Intenta nuevamente!")
        }   
    }
}

export function getPokemonDetail(id) {
    return async function (dispatch) {
        try {
        const poke = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: "GET_POKEMON_DETAIL",
            payload: poke.data
        })
        } catch (e) {
            alert(e)
        }
    }
}

export function postPokemon(data) {
    return async function(dispatch) {
    try{
        const dataCreate = await axios.post("http://localhost:3001/pokemons", data)
        return dataCreate
    } catch (e) {
        alert(e)
    }
    }
}

export function reloadPokemons () {
    return {
        type: "RELOAD_POKEMONS",
    }
}

export function filterType (typePoke) {
    return {
        type: "FILTER_TYPE",
        payload: typePoke
    }
}

export function filterAscDesc (ascDesc) {
    return {
        type: "FILTER_ASCDESC",
        payload: ascDesc
    }
}

export function filterApiDb (apiDb) {
    return {
        type: "FILTER_APIDB",
        payload: apiDb
    }
}

export function cleanDetail () {
    return {
        type: "CLEAN_DETAIL",
    }
}

export function createdStore (payload) {
    return {
        type: "CREATED_STORE",
        payload: payload
    }
}

// export function errorManager (e) {
//     return {
//         type: "ERROR_MANAGER",
//         payload: e
//     }
// }