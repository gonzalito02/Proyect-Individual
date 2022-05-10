import { Link } from "react-router-dom";
import {useEffect, React} from "react";
import {useDispatch, useSelector} from "react-redux"
import { getPokemons, getTypes } from "../actions";

export default function LandingPage () {
    
    const dispatch = useDispatch()
    const pokes = useSelector((state) => state.pokemons)
    const types = useSelector((state) => state.types)

    useEffect (() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch])

    let loading = true
    let charge = ""

    if (pokes.length > 2 && types.length > 2) loading = false
    if (loading) charge = "Cargando Pokemons!"

    return (
        <div className="landingPage">
            <img src=""></img>
            {/* <h1 id="land">Pokemon!</h1> */}
            {(charge === "")? null : <h2 id="land">{charge}</h2>}
            {(pokes.code === "ENOTFOUND")? <div><h1 id="land">{"No se pudieron traer los Pokemons :("}</h1><h1 id="land">{"Verifica tu conexión a Internet!"}</h1></div> : null} 
            {(!loading)? <h1 id="land">Listo!</h1> : null}
            <Link to="/home">
                <button className="limpiarFiltros" disabled={loading}>Entrar!</button>
            </Link>
            {(loading)?<div className="loading2">
                <div className="loader"></div>
                <div className="loader2"></div>
            </div>: null}
        </div>
    )
}