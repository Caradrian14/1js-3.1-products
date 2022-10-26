'use strict';
const json = require ('./datosIni.json');

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

    sum1UnitToProd(idProd){
        let prod = this.getProductById(idProd);
        prod.units++;
        return prod;
    }

    extract1UnitToProd(idProd){
        let prod = this.getProductById(idProd);
        if(prod.units > 0){
            prod.units--;
        }
        return prod;
    }

    loadData(){
        json.categories.forEach(categoria => {this.addCategory(categoria.name, categoria.description)});
        json.products.forEach(product => {this.addProduct(product)});
    }

    getCategoryById(id){
        var categoryToFind = this.categories.find(category => category.id == id)
        if(categoryToFind !== undefined){
            return categoryToFind;
        }
        throw "No encontrado";
    }


    getCategoryByName(name){
        var categoryToFind = this.categories.find(category => category.name.toLowerCase() == name.toLowerCase())
        if(categoryToFind !== undefined){
            return categoryToFind;
        }
        throw "No encontrado";
    }

    getProductById(id){
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

        var enconctrarMax = function(array){
            var max = 0;
            array.forEach(element => {
                if(element.id > max){
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
    
    editProduct(id, payload){
        let product = this.getProductById(id);
        product.name = payload.name;
        product.category = payload.category;
        product.price = payload.price;
        product.units = payload.units;
        return product;
    }

    delCategory(id){
        var categoryToEliminate = this.getCategoryById(id);
        if(this.getProductsByCategory(id).length === 0){
            this.categories = this.categories.filter(category => category.id != id);
            return categoryToEliminate;
        }
        throw "Error, la categoria tiene productos registrados";
    }

    delProduct(id){
        var productToEliminate = this.getProductById(id);
        if(productToEliminate.units < 1){
            this.products = this.products.filter(product => product.id != id);
            return productToEliminate;
        }
        throw "Error, el producto tiene unidades en Stock";
    }

    totalImport(){
        let importe = this.products.reduce((total, producto) => total += (producto.units * producto.price), 0);
        return importe.toFixed(2);
    }

    orderByUnitsDesc(){
        let sortByUnits = this.products.sort((element1, element2)  => element2.units - element1.units);
        return sortByUnits;
    }

    orderByName(){
        let sortByName = this.products.sort((element1, element2)  => element1.name.localeCompare(element2.name));
        return sortByName;
    }

    underStock(units){
        var productsBelowUnits = this.products.filter(product => product.units < units);
        return productsBelowUnits;
    }

    sameName2products(name, id){
        if(id === ''){
            let prod = this.products.find(product => product.name === name);
            if(prod){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    toString(){
        return  this.name + " => " + this.products.length + ": " + this.totalImport + " \n" +
        this.products.forEach(element => {
            "- " + element.name + ": " + element.units + " uds. x" + element.price + " €/u = " + (element.price * element.units);
        });
    }
}

module.exports = Store

