import express from 'express'

import productManager from './managers/productManager.js'
const productService = new productManager()

const app = express()
const PORT = 8080

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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res)=>{
    res.send(`<h1>Bienvenidos al servidor</h1>
    <br>
    <h3>Opciones: </h3>
    <h3>1. /productos</h3>
    <h3>2. /productoRandom</h3>
    `)
})

app.get('/producto/:id', async(req,res)=>{
    try {
        let id= parseInt(req.params.id)
        console.log(id)
        let producto = await productService.getProductById(id)
        res.send(createHTMLString([ producto]))
    } catch (error) {
        console.log(error)
    }
    
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
