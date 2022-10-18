'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class');
const myController = new Controller();
myController.init();

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {
  

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const id = (document.getElementById('newprod-id').value);
    const name = document.getElementById('newprod-name').value;
    const price = parseInt(document.getElementById('newprod-price').value);
    const category = document.getElementById('newprod-cat').value;
    const units = parseInt(document.getElementById('newprod-units').value);
    document.getElementById('new-prod').parentElement.classList.add('hideElement');
    
    if(id === ""){
      myController.addProductToStore({ name, category, price, units })
    }else{
      myController.editInnerProduct(parseInt(id), {name, category, price, units})
    }
  })

  document.getElementById('del-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.deleteProductFromStore(parseInt(document.getElementById('delprod-id').value));      
  })

  document.getElementById('add-cat').addEventListener('submit', (event) => {
    event.preventDefault()
    const nameCat = document.getElementById('addcat-name').value;
    const descCat = document.getElementById('addcat-desc').value;
    myController.addCategoryFromStore({nameCat, descCat});      
  })
  
  document.getElementById('del-cat').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.deleteCategoryFromStore(parseInt(document.getElementById('delcat-id').value));      
  })

  document.getElementsByClassName("navbar-nav")[0].children[2].addEventListener('click', (event) =>{
    event.preventDefault();
    myController.apperAddProduct();
  })

  document.getElementsByClassName("navbar-nav")[0].children[3].addEventListener('click', (event) =>{
    event.preventDefault();
    myController.apperAddcategory();
  })

  document.getElementsByClassName("navbar-nav")[0].children[4].addEventListener('click', (event) =>{
    event.preventDefault();
    myController.apperAboutUs();
  })

  document.getElementsByClassName("navbar-nav")[0].children[0].addEventListener('click', (event) =>{
    event.preventDefault();
    myController.apperProductList();
  })

  document.getElementsByClassName("navbar-nav")[0].children[1].addEventListener('click', (event) =>{
    event.preventDefault();
    myController.apperCategoryList();
  })
  
})
