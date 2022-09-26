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

    getCategoriesById(id){
        
        if( this.categories.find(function(categoria){
            if(categoria.id === id){
                return true;
            }
            return false
        }
        ) ){
            return this.categories.find(category.name === name);
        }
        throw 'Error Categoria no encontrado';
    }

    getCategoriesByName(name){
        try{
            if( this.categories.find(function(categoria){
                if(categoria.name === name){
                    return true;
                }
                return false
            }
            ) ){
                return this.categories.find(category.name === name);
            }
            throw 'Error Categoria no encontrado';
        }catch(err){
            console.log(err);
        }   
    }

    getProductById(id){
        try{
            if( this.products.find(function(products){
                if(products.id === id){
                    return true;
                }
                return false
            }
            ) ){
                return this.categories.find(category.name === name);
            }
            throw 'Error Producto no encontrado'; 
        }catch(err){
            console.log(err);
        } 
    }

    getProductByCategory(id){
        var filterFunction = function(products, id){
            if(products.category === id){
                true;
            }
            return false;
        }
        var listProducts = this.products.filter(filterFunction(products, id));
        return listProducts;
    }

    addCategory(nombre, descripcion){
        var maxFunction = function(){
            var max = 1;
            this.Category.forEach(element => {
                if(element.id > max){
                    max = element.id
                };
            });
            return max;
        }
        var maximo = maxFunction();
        var categoriaNueva = new Category(maximo, nombre.trim, descripcion.trim);
        this.categories.push(categoriaNueva);
    }

    addProduct(payload){
        try{
            if(payload.name === undefined){
                throw "Error nombre";
            }else if(this.categories.find(payload.category) === undefined) {
                throw "Error categoria no existe";
            }else if(prototype.price === undefined || prototype.price < 0){
                throw "Error precio positivo requerido";
            }else if(!payload.units.isInteger()){
                throw "Error cantidad no debe ser decimal";
            }
        }catch(err){
            console.log(err);
        }

    }

    addProduct(payload){
        if(payload.name === undefined){
            throw "Error nombre";
        }else if(this.categories.find(payload.category) === undefined) {
            throw "Error categoria no existe";
        }else if(prototype.price === undefined || prototype.price < 0){
            throw "Error precio positivo requerido";
        }else if(!payload.units.isInteger()){
            throw "Error cantidad no debe ser decimal";
        }

        var maximo = this.products.reduce((max, producto) =>{
            if(max > producto.id){
                return max;
            }else{
                return producto.id;
            }
        });

        var producto = new Product(maximo, payload.name, payload.category, payload.price, payload.units);
        this.products.push(producto);
    }

    delCategory(id){
        try{
            var productsList = this.products.filter(product => product.category === id);
            if(productsList.length === 0){
                var categoryEliminated = this.categories.find(category => category ===id);
                var indexCategory = this.categories.indexOf(categoryEliminated);
                this.categories.splice(indexCategory, 1);
                return categoryEliminated;
            }
            throw "Error, hay elementos o no existe"
        }catch(error){
            console.log(error);
        }
    }

    delProduct(id){
        try{
            var productToFind = this.products.filter(product => product.id === id);
            if(productToFind.units === 0){
                var indexProduct = this.products.indexOf(productToFind);
                this.products.splice(indexProduct, 1);
                return productToFind;
            }
            throw "Error";
        }catch(error){
            console.log(error);
        }
        
    }

    totalImport(){}

    orderByUnits(){}

    orderByStock(units){}

    toString(){
        return this.name + " " + this.id + " => " + this.products.length + ": " + this.totalImport + " €" 
        // FALTAN HACER UN BUCLE CON LOS PRODUCTOS. 
    }
}

module.exports = Store

