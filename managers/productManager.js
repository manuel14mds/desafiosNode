
import * as fs from 'fs';

const path = './files/products.json'

class productManager{
    getAllProducts = async()=>{
        try {
            if(fs.existsSync(path)){
                let fileData = await fs.promises.readFile(path, 'utf-8')
                let products = JSON.parse(fileData)
                return products
            }else{
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    addProducts = async(product) =>{
        try {
            let products = await this.getAllProducts()
            if(products.length === 0){
                product.id = 1
                products.push(product)
                await fs.promises.writeFile(path,JSON.stringify(products, null, '\t'))
                return product.id
            }else{
                product.id =products[products.length-1].id+1
                products.push(product)
                await fs.promises.writeFile(path,JSON.stringify(products, null, '\t'))
                return product.id
            }
        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async(id) =>{
        try {
            let products = await this.getAllProducts()
            let product = null
            for(const item of products){
                if(item.id===id){
                    product =item
                }
            }
            return product
        } catch (error) {
            console.log('getProductById',error)
        }
    }

    deleteProductById = async(id)=>{
        try {
            let products = await this.getAllProducts()
            let newproducts = []
            for(const item of products){
                if(item.id===id){
                    continue
                }
                newproducts.push(item)
            }
            await fs.promises.writeFile(path,JSON.stringify(newproducts, null, '\t'))
        } catch (error) {
            console.log(error)
        }
    }

    deleteAllProducts = async()=>{
        try {
            await fs.promises.writeFile(path,JSON.stringify([], null, '\t'))
        } catch (error) {
            console.log(error)
        }
    }
    getRandom = async()=>{
        try {
            let products = await this.getAllProducts()
            if(products.length===0) return 'hola'
            let numberRandom = parseInt(Math.random() * (products.length - 0) + 1)
            return products[numberRandom]
        } catch (error) {
            console.log(error)
        }
    }
}


export default productManager;
