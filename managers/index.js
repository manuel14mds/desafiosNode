/* const ProductManager = require('./managers/productManager.js')

const productService = new ProductManager()

const environment = async() =>{
    const newProduct = {
        name:'Nike Air Max 270',
        price: 136.97 ,
        thumbnail:'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b2947b89-0cbb-468c-b4c8-037fbf1b6cde/air-max-270-mens-shoes-KkLcGR.png'
    }
    //await productService.addProducts(newProduct)

    //await productService.deleteAllProducts()
    
    //let product = await productService.getProductById(3)
    //console.log(product)

    //await productService.deleteProductById(5)


    let products =  await productService.getAllProducts()
    console.log(products)
}

environment() */