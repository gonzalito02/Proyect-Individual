import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createdStore, getPokemons, getTypes, postPokemon } from "../actions";

export default function CreateNewPokemon () {

    const dispatch = useDispatch()
    var tipos = useSelector((state) => state.types)
    var pokes = useSelector((state) => state.pokemons)
    var created = useSelector ((state) => state.created)

    var names = [created]

    if (pokes.length > 0) {pokes.forEach(e => names.push(e.name))}

    useEffect(() => {
        if (tipos.length === 0) dispatch(getTypes()).then(dispatch(getPokemons()));
        return () => (dispatch(getPokemons()))
    }, [dispatch, tipos.length])

    var [formul, setFormul] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: "",
        types: []
    })

    var [error, setError] = useState({
        name: "",
        img: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        type1: ""
    })

    function validateText (e) {
        
        if((/ /).test(e.target.value)) {
            setError({...error, [e.target.name] : 'Este campo no puede tener espacios'});
        } 
        else if((/\W/).test(e.target.value) && e.target.name === "name") {
            setError({...error, [e.target.name] : 'No se pueden utilizar caracteres especiales'});
        }
        else if((/[0-9]/).test(e.target.value) && e.target.name === "name") {
            setError({...error, [e.target.name] : 'No se pueden utilizar números'});    
        } 
        else if (!e.target.value && e.target.name === "name") {
            setError({...error, [e.target.name] : 'Este dato es obligatorio'});
        }   
        else if (names.includes(e.target.value.toLowerCase())) {
            setError({...error, [e.target.name] : 'El nombre introducido ya existe'});
        }
        else {setError({...error, [e.target.name] : ""});setFormul({
            ...formul,
            [e.target.name] : e.target.value
        })}
    
    }

    function validateNumber (e) {

        if (e.target.value > 500 || e.target.value < 0) {
            setError({...error, [e.target.name] : "No se permiten puntos negativos ni superiores a 500"})
        }
        else if ((/\W/).test(e.target.value)) {
            setError({...error, [e.target.name] : "Solo números enteros, sin caracteres especiales"})
        }
        else {setError({...error, [e.target.name]:"" }); setFormul({
            ...formul,
            [e.target.name] : e.target.value
        })}
    }

    const handleChangeFormul = (e) => {
        e.preventDefault();
        setFormul({
            ...formul,
            [e.target.name] : e.target.value,
        })
    }

    const handleSelectType1 = (e) => {
        e.preventDefault();
        if (!formul.types.includes(e.target.value) && e.target.value!== "none") {
        setFormul({...formul, types : [...formul.types, e.target.value]});
        }
    }
    
    const handleDeleteType = (e) => {
        e.preventDefault();
        let extra = [] 
        for (let element of formul.types) {
            if (element !== e.target.value) {extra.push(element)} 
        }
        setFormul({
            ...formul,
            types : extra
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createdStore(formul.name))
        dispatch(postPokemon(formul));
        setFormul({name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: "",
        types: []})
        alert(`Se creó un nuevo pokemon con el nombre ${formul.name.toUpperCase()}!`)
    }

    var validate = true

    if (error.name === "" &&
        error.img === "" &&
        error.hp === "" &&
        error.attack === "" &&
        error.defense === "" &&
        error.speed === "" &&
        error.height === "" &&
        error.weight === "" &&
        error.type1 === "" &&
        formul.name !== "" &&
        formul.types.length <= 2 &&
        formul.types.length > 0
        ) { validate = false }

    var validateSelect = false

    if (formul.types.length >= 2) {validateSelect = true} 

    return (
        (pokes.length === 0)? <h1>Cargando...</h1>
        : 
        <div className="createContainer">
            <Link key="002" to="/home"><button className="backHome">Volver a Home</button></Link>
            <h1 className="titleForm">Crea tu propio Pokemon!</h1>
            <form className="form">
                <div className="formSpace">
                    <label className="label">Nombre (*): </label>
                    <input onChange={(e) => {handleChangeFormul(e); validateText(e)}} type="text" value={formul.name} name="name"></input>
                    {(error.name === "")? null : <span className="error">{error.name}</span>}
                </div>
                <div className="formSpace">
                    <label className="label">Puntos de vida (HP): </label>
                    <input onChange={(e) =>{handleChangeFormul(e); validateNumber(e)}} type="number" value={formul.hp} name="hp"></input>
                    {(error.hp === "")? null : <span className="error">{error.hp}</span>}
                </div>
                <div className="formSpace">
                    <label className="label">Puntos de ataque: </label>
                    <input onChange={(e) =>{handleChangeFormul(e); validateNumber(e)}} type="number" value={formul.attack} name="attack"></input>
                    {(error.attack === "")? null : <span className="error">{error.attack}</span>}
                </div>
                <div className="formSpace">
                    <label className="label">Puntos de defensa:</label>
                    <input onChange={(e) =>{handleChangeFormul(e); validateNumber(e)}} type="number" value={formul.defense} name="defense"></input>
                    {(error.defense === "")? null : <span className="error">{error.defense}</span>}
                </div>
                <div className="formSpace">
                    <label className="label">Puntos de velocidad:</label>
                    <input onChange={(e) =>{handleChangeFormul(e); validateNumber(e)}} type="number" value={formul.speed} name="speed"></input>
                    {(error.speed === "")? null : <span className="error">{error.speed}</span>}
                </div>
                <div className="formSpace">
                    <label className="label">Altura (en metros):</label>
                    <input onChange={(e) =>{handleChangeFormul(e); validateNumber(e)}} type="number" value={formul.height} name="height"></input>
                    {(error.height === "")? null : <span className="error">{error.height}</span>}
                </div>
                <div className="formSpace">
                    <label className="label">Peso (en kilogramos):</label>
                    <input onChange={(e) =>{handleChangeFormul(e); validateNumber(e)}} type="number" value={formul.weight} name="weight"></input>
                    {(error.weight === "")? null : <span className="error">{error.weight}</span>}
                </div>
                <div className="formSpace">
                    <label className="label">Imagen (URL):</label>
                    <input onChange={(e) => {handleChangeFormul(e); validateText(e)}} type="text" value={formul.img} name="img"></input>
                    {(error.img === "")? null : <span className="error">{error.img}</span>}
                </div>
                <div className="formSpace">
                    <label className="label">Selecciona el tipo/s del tu Pokemon! Hasta dos tipos. (*):</label>
                    <select disabled={validateSelect} onChange={(e) => {handleSelectType1(e);}}>
                        <option value="none">None</option>    
                        {tipos? tipos.map(t => {    
                            return (
                                <option value={t.name} name="type1" key={t.id}>{t.name.replace(/^\w/, (c) => c.toUpperCase())}</option>
                            )
                        }) : null
                        }
                    </select>
                    {(error.type1 === "")? null : <span className="error">{error.type1}</span>}
                </div>
                <div className="formSpace">
                    <label className="label">Tipos seleccionados:</label>
                    {(formul.types.length > 0)? formul.types.map(t => {
                        return <div><span value={t}>{t}</span><button value={t} onClick={e => handleDeleteType(e)}>x</button></div>
                    }) : null} 
                </div>
                <button className="backHome" disabled={validate} type="submit" onClick={e => handleSubmit(e)}>CREAR</button>
                <h4>(*) Dato obligatorio </h4>
            </form>
        </div>

    )

}
