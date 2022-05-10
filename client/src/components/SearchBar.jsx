import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../actions";

export default function SearchBar () {
    
    const dispatch = useDispatch()

    var [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getNamePokemon(name));
        setName("")
    }

    return (
        <div className="search">
            <input className="searchBar" onChange={(e) => handleInputChange(e)} type="text" placeholder="Buscar pokemon por nombre"/>
            <button className="searchButton" onClick={(e) => handleSubmit(e)} type="submit">Buscar!</button>
        </div>
    )


}