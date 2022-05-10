import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../actions";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function PokemonDetail () {

    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        dispatch(getPokemonDetail(id))
    }, [dispatch, id])

    const pokemon = useSelector((state) => state.detail)

    var upper = "Cargando.."

    if (pokemon.name) { upper = pokemon.name.toUpperCase()}

    return (
        <div className="detailContainer">
            <Link to="/home"><button className="backHome">Volver a Home</button></Link>
            {pokemon 
            ? <div className="detailGround">
                    <div className="component">
                    {(upper === "Cargando..")? <h1>{upper}</h1> : <h1>Elegiste a {upper}!</h1>}
                    <h1>ID Pokedex: {(typeof(pokemon.id) === "string")? "Desconocido" : pokemon.id}</h1>
                    <h2>Puntos de vida: {(pokemon.hp === null) ? "0 pts." : `${pokemon.hp} pts.`}</h2>
                    <h2>Puntos de ataque: {(pokemon.attack === null) ? "0 pts." : `${pokemon.attack} pts.`}</h2>
                    <h2>Puntos de defensa: {(pokemon.defense === null) ? "0 pts." : `${pokemon.defense} pts.`}</h2>
                    <h2>Puntos de velocidad: {(pokemon.speed === null) ? "0 pts." : `${pokemon.speed} pts.`}</h2>
                    <h2>Altura: {pokemon.height / 10} mts.</h2>
                    <h2>Peso: {(pokemon.weight / 10)} kg.</h2>
                    <h3>Tipo:</h3>
                    {pokemon.types? pokemon.types.map(e => {
                    return <h3>{e.name}</h3>
                    }) 
                    :
                    "Cargando.."}
                    </div>
                    <img className="componentImg" src={pokemon.img} alt="no img found"/> 
              </div>
            : <h3>Cargando..</h3> }
        </div>
    )

}