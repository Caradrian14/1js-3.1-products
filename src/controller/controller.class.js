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
            this.viewStore.renderNewProduct(element);
            this.calculateTotalImport();
            this.setEventListeners(element);
        });
        this.calculateTotalImport();
        this.addCategories(this.prodctStore.categories);
    }
    
    setEventListeners(newProd){
        let fila = document.getElementById(newProd.id);
            
        fila.querySelector(".delete").addEventListener('click', () =>{
            this.deleteProductFromStore(newProd.id);
        })

        fila.querySelector(".up").addEventListener('click', () =>{
            this.plus1UnitProd(newProd.id);

        })

        fila.querySelector(".down").addEventListener('click', () =>{
            this.extract1UnitToProd(newProd.id);

        })

        fila.querySelector(".edit").addEventListener('click', () =>{
            this.editProduct(newProd.id);
            document.getElementById('new-prod').parentElement.classList.remove('hideElement');
        })
    }

    addProductToStore(newProduct){
        try{
            const newProd = this.prodctStore.addProduct(newProduct);
            this.viewStore.renderNewProduct(newProd);
            this.calculateTotalImport();
            this.setEventListeners(newProd);
            this.viewStore.cleanForm();
        }catch(err){
            this.viewStore.renderMessege(err)
        }        
    }

    editProduct(idProduct){
        let product = this.prodctStore.getProductById(idProduct);
        this.viewStore.renderProductForm(product);
        this.calculateTotalImport();
    }

    editInnerProduct(id, payload){
        try{    
            let editedProd = this.prodctStore.editProduct(id, payload);
            this.viewStore.renderEditedProd(editedProd);
            this.calculateTotalImport();
                let fila = document.getElementById(editedProd.id);
                
                fila.querySelector(".delete").addEventListener('click', () =>{
                    this.deleteProductFromStore(editedProd.id);
                })

                fila.querySelector(".up").addEventListener('click', () =>{
                    this.plus1UnitProd(editedProd.id);

                })

                fila.querySelector(".down").addEventListener('click', () =>{
                    this.extract1UnitToProd(editedProd.id);

                })

                fila.querySelector(".edit").addEventListener('click', () =>{
                    this.editProduct(editedProd.id);

                })
            this.viewStore.cleanForm();
            this.calculateTotalImport();
            }catch(err){
                this.viewStore.renderMessege(err)
        }
    }

    plus1UnitProd(idProd){
        let prod = this.prodctStore.sum1UnitToProd(idProd);
        this.viewStore.renderEditedProd(prod);
        this.calculateTotalImport();
    }

    extract1UnitToProd(idProd){
        let prod = this.prodctStore.extract1UnitToProd(idProd);
        this.viewStore.renderEditedProd(prod);
        this.calculateTotalImport();
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

    apperAddProduct(){
        this.viewStore.apperAddProductView();
    }

    apperAddcategory(){
        this.viewStore.apperAddCategoryView();
    }

    apperAboutUs(){
        this.viewStore.apperAboutUsView();
    }

    apperProductList(){
        this.viewStore.apperProductListView();
    }
    
    apperCategoryList(){
        this.viewStore.apperCategoryListView();
    }
}

module.exports = Controller