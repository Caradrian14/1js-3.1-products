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
    const name = document.getElementById('newprod-name').value;
    const price = parseInt(document.getElementById('newprod-price').value);
    const category = document.getElementById('newprod-cat').value;
    const units = parseInt(document.getElementById('newprod-units').value);
    
    

    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    myController.addProductToStore({ name, category, price, units })   

    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // )

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
})
