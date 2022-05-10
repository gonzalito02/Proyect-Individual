import {useEffect, React, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import {filterType, reloadPokemons, filterAscDesc, filterApiDb, getPokemons, cleanDetail, getTypes} from "../actions";
import { Link } from "react-router-dom";
import Pokemon from "./Pokemon";
import SearchBar from "./SearchBar";

export default function Home () {
    
    const dispatch = useDispatch()
    var pokes = useSelector((state) => state.pokemons)
    var types = useSelector((state) => state.types)
    const [boolean, setBoolean] = useState(false)

    var [page, setPage] = useState(1)

    var pokesPage = 12

    var lastIndex = page * pokesPage
    var firstIndex = lastIndex - pokesPage
    var currentPokes = pokes.slice(firstIndex, lastIndex)

    var limitPage = Math.ceil(pokes.length/pokesPage)

    var navControl = false
    var firstPrevControl = false
    var nextLastControl = false

    var disabledBut = false //
    
    if (page === 1 || pokes.length === 0) firstPrevControl = true
    if (page === limitPage || pokes.length === 0) nextLastControl = true
    if (types.length === 0) disabledBut = true

    var pageControl = (e) => {
        if (e.target.name === "first") setPage(1)
        if (e.target.name === "previous" && page > 1) setPage(page - 1)
        if (e.target.name === "next" && page < limitPage + 1) setPage(page + 1)
        if (e.target.name === "last" && page < limitPage + 1) setPage(limitPage)
    }

    useEffect (() => {
        if (pokes.length === 0 && types.length === 0) {dispatch(getPokemons()).then(()=> dispatch(getTypes()))};
        dispatch(cleanDetail())
    }, [dispatch, pokes.length, types.length])

    function handleClickReload(e) {
        e.preventDefault();
        dispatch(reloadPokemons());
    }

    function handleFilterAscDesc(e){
        e.preventDefault();
        setBoolean(!boolean);
        setPage(1);
        dispatch(filterAscDesc(e.target.value))
    }

    function handleFilterApiDb(e){
        e.preventDefault();
        setBoolean(!boolean);
        setPage(1);
        dispatch(filterApiDb(e.target.value))
    }

    function handleFilterTypes(e){
        e.preventDefault();
        setBoolean(!boolean);
        setPage(1);
        dispatch(filterType(e.target.value))
    }
    
    const pages = []

    for (let i = 1; i <= Math.ceil(pokes.length/pokesPage); i++) {
        pages.push(i)
    }

    return (
        (pokes.code === "ENOTFOUND") ? <div><h1>Pokemon!</h1><h2>Verifica tu conexión a Internet e intenta nuevamente!</h2></div>
        :  
        <div>
                    <div className="buttonsContainer">
                        <img src="titulo.png" height="95px" width="200px"></img>
                        <Link key="01" to = "/createPokemon"><button disabled={disabledBut} className="limpiarFiltros">Create Pokemon</button></Link>
                        {!disabledBut? <SearchBar key="02"/> : <h2>- Cargando -</h2>}
                        <div className="filter">
                                <label>Orden: </label>
                                    <select disabled={disabledBut} onChange={e => handleFilterAscDesc(e)}>
                                        <option value = "ID" key = "idkey">ID Pokedex</option>
                                        <option value = "ascendente" key = "asc">Ascendente</option>
                                        <option value = "descendente" key = "desc">Descendente</option>
                                        <option value = "attack" key = "attack">Por ataque</option>
                                    </select>
                        </div>
                        <div className="filter">
                                <label>Filtro por origen: </label>
                                    <select disabled={disabledBut} onChange={e => handleFilterApiDb(e)}>
                                        <option value = "all" key = "allApiDb">Todos</option>
                                        <option value = "api" key = "api">Api</option>
                                        <option value = "creados" key = "db">Creados</option>
                                    </select>
                        </div>
                        <div className="filter">        
                                <label>Filtro por tipo: </label>
                                    <select disabled={disabledBut} onChange={e => handleFilterTypes(e)}>
                                    <option value = "all" key = "alltypes">None</option>
                                    {types? types.map(t => {
                                        return (
                                            <option value={t.name} key={t.id + "type"}>{t.name.replace(/^\w/, (c) => c.toUpperCase())}</option>
                                        )
                                    }) : <h2>Cargando...</h2>
                                    }
                                </select>
                        </div>
                        <button disabled={disabledBut} className="limpiarFiltros" onClick={e => {handleClickReload(e)}}>Limpiar filtros!</button>   
                    </div>
                        <div className="ground">
                            {(pokes.length !== 0 && types.length !== 0)     
                            ?        <div>
                                        <div className="cardContainer">
                                            {currentPokes? currentPokes.map(p => { 
                                                return (
                                                <Link key={p.id + "li"} to={`/home/${p.id}`}>
                                                    <Pokemon nam={p.name} imagen={p.img} ky={p.id} key={p.id + "poke"} tipos={p.types}></Pokemon>
                                                </Link>
                                                ) 
                                                }) 
                                                : <h2>Cargando...</h2>}
                                        </div>
                                    </div>
                            : (pokes.length === 0 && types.length === 0)
                            ?<h2 className="loading">Cargando...</h2>
                            : (pokes.length === 0 && types.length !== 0)?
                            <h2>No se encontraron pokemons con esos filtros :C</h2>
                            :<h2 className="loading">Cargando...</h2>
                            }      
                <div className="navControl">
                    <ul>
                        <button key="button1" id="button" disabled={navControl || firstPrevControl} onClick={(e) => pageControl(e)} name="first" value={0}>Primera página</button>
                        <button key="button2" id="button" disabled={navControl || firstPrevControl} onClick={(e) => pageControl(e)} name="previous" value={-1}>Página anterior</button>
                        <button key="button3" id="button" disabled={navControl || nextLastControl} onClick={(e) => pageControl(e)} name="next" value={1}>Página siguiente</button>
                        <button key="button4" id="button" disabled={navControl || nextLastControl} onClick={(e) => pageControl(e)} name="last" value={-1}>Última página</button>
                    </ul>
                    <h3>Página {page} de {limitPage}, {pokesPage} pokemons por página - {`${pokes.length} pokemons en total`}</h3>
                </div>                      
            </div>
            
        </div>
    )

}