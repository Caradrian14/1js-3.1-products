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

    async init(){
        this.setEventListenersNav();
        this.viewStore.init();
        await this.prodctStore.loadData();
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

    async addProductToStore(newProduct){
        try{
            const newProd = await this.prodctStore.addProduct(newProduct);
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

    async editInnerProduct(id, payload){
        try{    
            let editedProd = await this.prodctStore.editProduct(id, payload);
            this.viewStore.renderEditedProd(editedProd);
            this.calculateTotalImport();
            this.viewStore.cleanForm();
            this.calculateTotalImport();
            }catch(err){
                this.viewStore.renderMessege(err)
        }
    }

    async plus1UnitProd(idProd){
        let prod = await this.prodctStore.sum1UnitToProd(idProd);
        this.viewStore.renderEditedProd(prod);
        this.calculateTotalImport();
    }

    async extract1UnitToProd(idProd){
        let prod = await this.prodctStore.extract1UnitToProd(idProd);
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
    
    async deleteProductFromStore(idProduct){
        try{

            await this.prodctStore.delProduct(idProduct);
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

    setEventListenersNav(){
        window.addEventListener('load', () => {
            this.setListenersValidity();

            // función manejadora del formulario 'new-prod'
            document.getElementById('new-prod').addEventListener('submit', (event) => {
              event.preventDefault()
              if(!document.getElementById('new-prod').checkValidity()){
                
                return;
            }
              // Aquí el código para obtener los datos del formulario
              const id = (document.getElementById('newprod-id').value);
              const name = document.getElementById('newprod-name').value;
              const price = parseInt(document.getElementById('newprod-price').value);
              const category = document.getElementById('newprod-cat').value;
              const units = parseInt(document.getElementById('newprod-units').value);
              document.getElementById('new-prod').parentElement.classList.add('hideElement');
              
              if(id === ""){
                this.addProductToStore({ name, category, price, units })
              }else{
                this.editInnerProduct(parseInt(id), {name, category, price, units})
              }
            })
          
            document.getElementById('del-prod').addEventListener('submit', (event) => {
              event.preventDefault()
          
              this.deleteProductFromStore(parseInt(document.getElementById('delprod-id').value));      
            })
          
            document.getElementById('add-cat').addEventListener('submit', (event) => {
              event.preventDefault()
              const nameCat = document.getElementById('addcat-name').value;
              const descCat = document.getElementById('addcat-desc').value;
              this.addCategoryFromStore({nameCat, descCat});      
            })
            
            document.getElementById('del-cat').addEventListener('submit', (event) => {
              event.preventDefault()
          
              this.deleteCategoryFromStore(parseInt(document.getElementById('delcat-id').value));      
            })
          
            document.getElementsByClassName("navbar-nav")[0].children[2].addEventListener('click', (event) =>{
              event.preventDefault();
              this.apperAddProduct();
            })
          
            document.getElementsByClassName("navbar-nav")[0].children[3].addEventListener('click', (event) =>{
              event.preventDefault();
              this.apperAddcategory();
            })
          
            document.getElementsByClassName("navbar-nav")[0].children[4].addEventListener('click', (event) =>{
              event.preventDefault();
              this.apperAboutUs();
            })
          
            document.getElementsByClassName("navbar-nav")[0].children[0].addEventListener('click', (event) =>{
              event.preventDefault();
              this.apperProductList();
            })
          
            document.getElementsByClassName("navbar-nav")[0].children[1].addEventListener('click', (event) =>{
              event.preventDefault();
              this.apperCategoryList();
            })
    })}
    
    setListenersValidity(){
        // Listeners de validacion del formulario
        let inputId = document.getElementById('newprod-id');
        let inputName = document.getElementById('newprod-name');
        inputName.addEventListener("blur", ()=>{
            if(this.prodctStore.sameName2products(inputName.value, inputId.value)){
                inputName.setCustomValidity('El nombre ya existe en el almacen');
            }else{
                inputName.setCustomValidity('');
            }
            inputName.nextElementSibling.textContent = inputName.validationMessage;
        })

        let inputCat = document.getElementById('newprod-cat');
        inputCat.addEventListener("blur", ()=>{
            inputCat.nextElementSibling.textContent = inputName.validationMessage;
        })

        let inputUnits = document.getElementById('newprod-units');
        inputUnits.addEventListener("blur", ()=>{
            if(inputUnits.value < 0 || inputUnits.value > 100){
                inputUnits.setCustomValidity('Las unidades deben estar entre 0 y 100');
            } else{
                inputUnits.setCustomValidity('');
            }
            inputUnits.nextElementSibling.textContent = inputUnits.validationMessage;
        })

        let inputPrice = document.getElementById('newprod-price');
        inputPrice.addEventListener("blur", ()=>{
            if(inputPrice.value < 0){
                inputPrice.setCustomValidity('Las unidades deben ser mas que 0 y tener dos decimales');
            } else{
                inputPrice.setCustomValidity('');
            }
            inputPrice.nextElementSibling.textContent = inputPrice.validationMessage;
        })

    }
}

module.exports = Controller