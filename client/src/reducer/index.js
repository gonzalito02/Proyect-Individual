const initialState = {
    pokemons : [],
    backup: [],
    detail: [],
    types: [],
    created: []
}


export default function Reducer (state = initialState, action){
    switch(action.type) {

        case "GET_POKEMONS": {
            return {
                ...state,
                pokemons: action.payload,
                backup: action.payload,
            }
        }

        case "GET_POKEMON_NAME": {
            return {
                ...state,
                pokemons: [action.payload],
            }
        }

        case "GET_POKEMON_DETAIL": {
            return {
                ...state,
                detail: action.payload
            }
        }

        case "RELOAD_POKEMONS": {
            return {
                ...state,
                pokemons: [...state.backup],
                detail: []
            }
        }

        case "CLEAN_DETAIL": {
            return {
                ...state,
                detail: []
            }
        }

        case "GET_TYPES": {
            return {
                ...state,
                types: action.payload
            }
        }

        case "FILTER_TYPE": {
            
            var filterTypo = [...state.backup]
            
            try {

            var filterTypeBack = filterTypo.filter(e => (e.types.length>1) 
                ? e.types[1].name === action.payload || e.types[0].name === action.payload
                : e.types[0].name === action.payload)
            
            } catch (e) {
                console.log(e.message)
            }
            
            if (action.payload === "all") {
                return {
                    ...state,
                    pokemons: state.backup
                }
            }

            return {
                ...state,
                pokemons: filterTypeBack
            }
        }

        case "FILTER_ASCDESC": {
            
            var filterAscDesc = [...state.backup]

            if(action.payload === "ID") return {
                ...state,
                pokemons: [...state.backup]
            }

            /* if (action.payload === "ID") {filterAscDesc.sort((a, b) => {
                if (a.id < b.id) return -1
                if (a.id > b.id) return 1
                return 0
            })} */

            if (action.payload === "attack") {filterAscDesc.sort((a, b) => {
                if (a.attack > b.attack) return -1
                if (a.attack < b.attack) return 1
                return 0
            })}
            
            if (action.payload === "ascendente") {filterAscDesc.sort((a, b) => {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1
                return 0
            })}
            
            if (action.payload === "descendente") {filterAscDesc.sort((a, b) => {
                if (a.name < b.name) return 1
                if (a.name > b.name) return -1
                return 0
            })}

            return {
                ...state,
                pokemons: filterAscDesc
            }
            
        }  

        case "FILTER_APIDB": {

            var filterBase = [...state.backup]
            
            var filterApiDb = []  

            if (action.payload === "creados") {filterApiDb = filterBase.filter(e => e.id.length > 20)}

            if (action.payload === "api") {filterApiDb = filterBase.filter(e => e.id.length === undefined)}
            
            if (action.payload === "all") {
                return {
                    ...state,
                    pokemons: [...state.backup]
                }
            }

            return {
                ...state,
                pokemons: filterApiDb
            }
        }

        case "CREATED_STORE" : {
            return {
                ...state,
                created: action.payload
            }
        }

        default: return {...state}
           
    }
}
