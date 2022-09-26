'use strict';

const { prototype } = require('./category.class');
const Category = require('./category.class');
const Product = require('./product.class');

// Aquí la clase Store
class Store{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.products = [];
        this.categories = [];
    
    }

    getCategoryById(id){
        var categoryToFind = this.categories.find(category => category.id == id)
        if(categoryToFind !== undefined){
            return categoryToFind;
        }
        throw "No encontrado";
    }


    getCategoryByName(name){
        var categoryToFind = this.categories.find(category => category.name == name)
        if(categoryToFind !== undefined){
            return categoryToFind;
        }
        throw "No encontrado";
    }

    getProductsById(id){
        var productToFind = this.products.find(products => products.id === id)
        if(productToFind !== undefined){
            return productToFind;
        }
        throw "No encontrado";
    }

    getProductsByCategory(id){
        var listProducts = this.products.filter(product => product.category === id); 
        return listProducts;
    }

    addCategory(nombre, descripcion){
        //Comprobar si existe la categoria
        if(this.categories.find(category => category.name=== nombre.toLowerCase())){
            throw "Categoria ya existe";
        }
        if(!nombre){
            throw "Ha de haber nombre";
        }

        //encontrar el max id
        var enconctrarMax = function(array){
            var max = 0;
            array.forEach(element => {
                if(element.id > 0){
                    max = element.id;
                }
            });
            return max;
        }
        var maximoId = enconctrarMax(this.categories);

        // var maxId = this.categories.reduce((max, valorActual) => {
        //     (valorActual.id > max)?
        //     valorActual.id:
        //     max;
        // },0)

        var newCategory = new Category(maximoId +1  , nombre.toLowerCase(), descripcion);
        this.categories.push(newCategory);
        return newCategory;
    }

    addProduct(payload){
        //Errores
        if(!payload.name || 
            !payload.category || 
            !payload.price ||
            payload.price < 0 ||
            payload.units < 0||
            typeof(payload.price) !== "number"||
            typeof(payload.units) === "boolan" ||
            typeof(payload.units) === "string"
            
            ){
                throw "Datos incorrectos";
            }
        //Compribamos si existe Categoria, lanzaria Error en get
        var category
        
        category = this.getCategoryById(payload.category);
        
        //definimos el maximo id
        // var maxId = this.categories.reduce((max, categoriaActual) => 
        // categoriaActual.id > max? categoriaActual.id : max, 0);
        
        var enconctrarMax = function(array){
            var max = 0;
            array.forEach(element => {
                if(element.id > 0){
                    max = element.id;
                }
            });
            return max;
        }
        var maximoId = enconctrarMax(this.products);
        //Construir el objeto
        var newProduct = new Product(maximoId +1, payload.name, payload.category, payload.price, payload.units);
        this.products.push(newProduct);
        return newProduct;
        
    }

    delCategory(id){
        var categoryToFind = this.getCategoryById(id);
        var prodWithCateg = this.products.filter(product => product.category === id);
        if(prodWithCateg.length !== 0){
            throw "Error, hay productos con esta categoria";
        }
        var indexToDelete = this.category.indexOf(categoryToFind);
        this.category.splice(indexToDelete,1);
        return categoryToFind
    }

    delProduct(id){
        Product
    }

    totalImport(){
        //return import
    }

    orderByUnits(){
        //Product{}
    }

    orderByName(){
        //Product[]
    }

    underStock(units){
        //Product[]
    }

    toString(){

    }
}

module.exports = Store

