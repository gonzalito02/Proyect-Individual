/* const { Router } = require('express');
const axios = require("axios");
const { Pokemon , Type } = require('../db.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// rutas del back
    
router.get("/pokemons", async (req, res) => {
    
    try {
    
        let limit = 11 //marca el limite de recorrido de la API
        
        let apiPoke = []
        
        for (let i = 1; i < limit; i++) {
            var values = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            
            var poke = {
                //id: values.data.id,
                name: values.data.name,
                hp: values.data.stats[0].base_stat,
                attack: values.data.stats[1].base_stat,
                defense: values.data.stats[2].base_stat,
                speed: values.data.stats[5].base_stat,
                height: values.data.height,
                weight: values.data.weight,                
                img: values.data.sprites.other["official-artwork"]["front_default"],
            }
            apiPoke.push(poke)
        }

        apiPoke.forEach(e => {
            Pokemon.findOrCreate({
                where: {
                    //id: e.id,
                    name: e.name,
                    hp: e.hp,
                    attack: e.attack,
                    defense: e.defense,
                    speed: e.speed,
                    height: e.height,
                    weight: e.weight,
                    img: e.img,
                    createdInDb: false,
                }
            })
            //console.log("pokemon creado")
        }) 

        let allPokes = await Pokemon.findAll()
        
        res.json(allPokes)
    } catch (err) {
        res.status(404).send(err.message)
    }
    
})

router.get("/pokemons/:idPokemon", async (req, res) => {
    const { idPokemon } = req.params;
    //console.log(idPokemon)
    try {
        
        let poke = await Pokemon.findByPk(idPokemon)
        // let poke = await Pokemon.findOne({
        //     where: {id: idPokemon}
        // })
        res.json( poke || 'No se encontró el pokemon')

    } catch (err) {
        res.status(404).send(err.message)
    }
})
// [ ] GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
router.get("/pokemon", async (req, res) => {
    const { name } = req.query;
    
    try { 
        if (name) {
            let pokeSearch = await Pokemon.findAll({
                where: {name: name}
            })
            res.json(pokeSearch)
        }
    
    } catch (err) { 
        res.status(404).send(err.message)
    }
})
// [ ] GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado
router.post("/pokemons", async (req, res) => {
    let { name, hp, attack, defense, speed, height, weight } = req.body;
    console.log(name);
    try {
        let pokemon = await Pokemon.create({
            name: name,
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
        })
        res.send(`El pokemon ${name} ha sido creado con éxito`)

    } catch (error) {
        res.status(404).send(error.message)
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

    let allTypes = await Type.findAll()
        
    res.json(allTypes)

    } catch (err) {
        res.status(404).send(err.message)
    }
})
// [ ] GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí


module.exports = router; */
