import React from "react";


//este componente herada las propiedades del home, porque el home
//ya trajo el estado.


export default function Pokemon ({ nam, imagen, tipos, ky}) {

    return (
        <div className="pokeCard"  key={ky}>
            <h3 className="namePoke">{nam.toUpperCase()}</h3>
            <img src={imagen} alt="img not found" width="140px" height="140px"/>
                <div className="typesPoke">
                    {/* <h3>Tipos</h3> */}
                    {tipos? tipos.map(e => {
                        return <h3 className="typosDetail" key={e.name + "typo"}>{e.name}</h3>
                    }) 
                    :   
                    "Cargando.."}
                </div>
        </div>
    )
}