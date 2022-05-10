const { Router } = require('express');
const axios = require("axios");
const { Pokemon , Type } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// rutas del back
    
router.get("/pokemons", async (req, res) => {
    
    try {
    
        let limit = 40 //marca el limite de recorrido de la API, o número máximo de pokemons a traer (menos 1)
        
        let pokesDB = await Pokemon.findAll({
            include:{
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        }) 

        let apiPoke = []
        
        for (let i = 1; i < limit; i++) {
            
            var values = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            var typo1 = values.data.types[0].type.name
            var typo2 = null 

            if (values.data.types.length > 1) { 
                var typo2 = values.data.types[1].type.name
            }

            var poke = {
                id: values.data.id,
                name: values.data.name,
                attack: values.data.stats[1].base_stat,              
                img: values.data.sprites.other["official-artwork"]["front_default"],
                types: [{name: typo1}, {name: typo2}]
            }

            apiPoke.push(poke)

        }
        
        let allPokes = apiPoke.concat(pokesDB)
        
        res.status(200).json(allPokes)  

    } catch (err) {

        res.json(err)

    }
    
})



router.get("/pokemons/:idPokemon", async (req, res) => {
    
    var { idPokemon } = req.params;

    if (idPokemon.length > 20) {
        
        poke = await Pokemon.findByPk(idPokemon, {
            include:{
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        return res.json( poke || "No existe Pokemon con el ID recibido") 
        
    }

    if (parseInt(idPokemon) <= 0) return res.send("El ID debe ser un número mayor que 0 o en clave UUID")

    try {  
        var values = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`)
        
        var typo1 = values.data.types[0].type.name
        var typo2 = null 

        if (values.data.types.length > 1) { 
            var typo2 = values.data.types[1].type.name
        }
        
        var poke = {
            id: values.data.id,
            name: values.data.name,
            hp: values.data.stats[0].base_stat,
            attack: values.data.stats[1].base_stat,
            defense: values.data.stats[2].base_stat,
            speed: values.data.stats[5].base_stat,
            height: values.data.height,
            weight: values.data.weight,                
            img: values.data.sprites.other["official-artwork"]["front_default"],
            types: [{name: typo1}, {name: typo2}]
        }
        res.json(poke)

    } catch (err) {

        res.send("No existe Pokemon con el ID recibido")
    
    }
})

router.get("/pokemon", async (req, res) => {
    
    const { name } = req.query;
    
    let tolower = name.toLowerCase()

    try {  

        try {
            
            if (tolower) {
        
            var values = await axios.get(`https://pokeapi.co/api/v2/pokemon/${tolower}/`)

            console.log(values.data)

            var typo1 = values.data.types[0].type.name
            var typo2 = null

            if (values.data.types.length > 1) { 
                var typo2 = values.data.types[1].type.name
            }

            var poke = {
                id: values.data.id,
                name: values.data.name,
                hp: values.data.stats[0].base_stat,
                attack: values.data.stats[1].base_stat,
                defense: values.data.stats[2].base_stat,
                speed: values.data.stats[5].base_stat,
                height: values.data.height,
                weight: values.data.weight,      
                img: values.data.sprites.other["official-artwork"]["front_default"],
                types: [{name: typo1}, {name: typo2}]
            }
            
            res.json(poke)
        
        } 
            
        } catch {

            var valuesDB = await Pokemon.findAll({
                where: {name: tolower},
                include:{
                    model: Type,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }, 
                }})
            
            if (typeof(valuesDB[0].id)==="string") res.json(valuesDB[0])
        }

    } catch (err) {

        res.status(404).json(err)
    
    }
})
// [ ] GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado
router.post("/pokemons", async (req, res) => {

    let { name, hp, attack, defense, speed, height, weight, img, types } = req.body;

    try {
        let pokemon = await Pokemon.create({
            name: name,  // string
            hp: hp,  //number
            attack: attack,  //number
            defense: defense,  //number
            speed: speed,  //number
            height: height,  //number
            weight: weight,  //number
            img: img,
        })

        var index = []

        for (tipo of types) {
            let ind = await Type.findAll({
                where: {name : tipo}
            })
            index.push(ind)
        }
        
        for (opt of index) {
            pokemon.addType(opt[0].id)
        }

        res.send(`El pokemon ${name} ha sido creado con éxito`)

    } catch (error) {

        res.send("No se ha podido crear el pokemon en la base de datos. Cheque tu conexión y prueba nuevamente")

    }
})
// [ ] POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos


router.get("/types", async (req, res) => {

    try {
        let values = await axios.get(`https://pokeapi.co/api/v2/type`)
        let routes = [] 
        const types = []
        values.data.results.forEach((e) => routes.push(e.url))  

        for (let i = 0; i < routes.length; i++) {
            let search = await axios.get(routes[i])
            let obj = {
                id: search.data.id,
                type: search.data.name
            }
            types.push(obj)
        }

        types.forEach(e => {
            Type.findOrCreate({
                where: {
                    id: e.id,
                    name: e.type
                }
            })
        })

    let allTypes = await Type.findAll({
        order: ["name"]
    })
        
    res.json(allTypes)

    } catch (err) {
        res.status(404).json(err)
    }
})
// [ ] GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí


module.exports = router;
