'use strict';
const View = require("../view/view.class");
const Store = require ("../model/store.class");
const Product = require ("../model/product.class");
const Category = require ("../model/category.class");


class Controller{
    
    constructor(){
        this.prodctStore = new Store(1, "Almacén ACME");
        this.viewStore = new View();
    }

    init(){
        this.viewStore.init();
        this.prodctStore.loadData();
        let produtList = this.prodctStore.products;
        produtList.forEach(element => {
            this.addProductToStore(element);
        });
        this.calculateTotalImport();
        this.addCategories(this.prodctStore.categories);
    }

    addProductToStore(newProduct){
        try{
            const newProd = this.prodctStore.addProduct(newProduct);
            this.viewStore.renderNewProduct(newProd);
            console.log("objeto añadido");
            this.calculateTotalImport();
        }catch(err){
            this.viewStore.renderMessege(err)
        }        
    }
    
    calculateTotalImport(){
        let totalImport = this.prodctStore.totalImport();
        this.viewStore.renderTotalImport(totalImport);
    }

    addCategories(){
        try{
            let categories = this.prodctStore.categories;
            this.viewStore.addCategories(categories);
        }catch(err){
            this.viewStore.renderMessege(err)
        }
        
    }

    addCategoryFromStore(cat){
        try{
            const newCat = this.prodctStore.addCategory(cat.nameCat, cat.descCat);
            this.viewStore.renderNewcategory(newCat);
            console.log("Cat añadido");
        }catch(err){
            this.viewStore.renderMessege(err)
        }        
    }
    
    deleteProductFromStore(idProduct){
        try{
            this.prodctStore.delProduct(idProduct);
            this.viewStore.delProduct(idProduct);
            this.calculateTotalImport();
        }catch(err){
            this.viewStore.renderMessege(err)
        }
        
    }

    deleteCategoryFromStore(idCat){
        try{
            this.prodctStore.delCategory(idCat);
            this.viewStore.delCat(idCat);
        }catch(err){
            this.viewStore.renderMessege(err)
        }
        
    }
}

module.exports = Controller