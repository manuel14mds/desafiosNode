import express from 'express'
import moment from 'moment'
/* import productManager, { getAllProducts, getProductById } from './managers/productManager.js' */

/* import './managers/productManager.js' */

/* import productManager from './managers/productManager.js' */
/* 
const ProductManager = require('./managers/productManager.js') */

import productManager from './managers/productManager.js'
const productService = new productManager()

const app = express()
const PORT = 8080
let counter = 0

function createHTMLString(productlist){
    let string=''
    for(const prod of productlist){
        string +=`
        <h1>${prod.name}</h1>
        <h3>${prod.price}</h3>
        <img style='width:300px' src='${prod.thumbnail}'></img>
        <br>
        <br>
        `
    }
    return string
}

const server = app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
})

app.get('/', (req, res)=>{
    res.send('<h1>Bienvenidos al servidor</h1>')
})

app.get('/productos', async(req, res)=>{
    try {
        let products = await productService.getAllProducts()
        let string=createHTMLString(products)
        res.send(string)
        
    } catch (error) {
        console.log(error)
    }
})
app.get('/productoRandom', async(req, res)=>{
    try {
        if(await productService.getRandom()==='hola'){
            res.send('No hay productos')
        }else{
            let product= await productService.getRandom()
            console.log(product)
            res.send(createHTMLString([ product]))
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/papa', (req, res)=>{
    res.send('Estas en la ruta papa')
})

app.get('/vistas', (req, res)=>{
    counter++
    res.send(`El endpoint se ha visitado ${counter} veces`)
})

app.get('/fyh', (req, res)=>{
    let currentTime = moment()
    res.send(currentTime.format('DD/MM/YYYY hh:mm:ss'))
})

app.get('/info', (req, res)=>{
    let role = req.query.role
    if(!role) return res.send('No se envió un rol')
    if(role !=='admin') return res.send('Informacion no accesible')
    res.send(`aqui esta toda la info ${req.query}`)
    res.send(role)
})