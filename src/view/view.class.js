'use strict';

const Controller = require("../controller/controller.class");

class View{
    init(){}

    renderNewProduct(prod){
        this.hideAllElements();
        document.getElementById("almacen").classList.remove("hideElement");
        let newTrObject = document.createElement('tr');
        newTrObject.id = prod.id;
        newTrObject.innerHTML+= ("<td>" + prod.id +"</td><td>"+ prod.name +"</td><td>" + prod.category +"</td><td>"+ prod.units + "</td><td>" + prod.price + "</td><td>" + prod.productImport() + 
        "</td><td><button class='btn btn-secondary up'><span class='material-icons'>arrow_drop_up</span></button>" +
        "  <button class='btn btn-secondary down'> <span class='material-icons'>arrow_drop_down</span></button>"+ 
        "  <button class='btn btn-secondary edit'> <span class='material-icons'>edit</span></button>"+
        "  <button class='btn btn-secondary delete'> <span class='material-icons'>delete</span></button></td>");
        document.getElementById('tableProducts').appendChild(newTrObject);
    }

    renderNewcategory(cat){
        let selectorCategories = document.getElementById("newprod-cat");
        this.apperCategoryListView();
        this.hideAllElements();
        document.getElementById("almacen").classList.remove("hideElement");
        let newCategorie = document.createElement("option");
        newCategorie.id = cat.id;
        newCategorie.textContent += (cat.name);
        newCategorie.setAttribute('value', cat.id);
        selectorCategories.appendChild(newCategorie);
    }

    renderMessege(err){
        let messageDiv = document.getElementById("messages");
        let divAlert = document.createElement("div");
        divAlert.setAttribute("class", "alert alert-danger alert-dismissible");
        divAlert.setAttribute("role", "alert");
        divAlert.innerHTML = (err +
             `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>`);
        setTimeout(messageDiv.appendChild(divAlert), 5000);
        setTimeout(deleteMns, 5000);
        function deleteMns(){
            divAlert.remove();
        }
    }

    renderTotalImport(totalImport){
        let thImportTotal = document.getElementById("totalImport");
        thImportTotal.textContent = (totalImport + " €");
    }

    addCategories(categories){
        let selectorCategories = document.getElementById("newprod-cat");
        categories.forEach(element => {
            let newCategorie = document.createElement("option");
            newCategorie.id = element.id;
            newCategorie.textContent += (element.name);
            newCategorie.setAttribute('value', element.id);
            selectorCategories.appendChild(newCategorie);
        });
    }

    delProduct(idProd){
        let rowToEliminate = document.getElementById(idProd);
        rowToEliminate.remove();
    }

    delCat(idCat){
        let selectorToEliminate = document.getElementById(idCat);
        selectorToEliminate.remove();
    }

    renderProductForm(product){
        document.getElementById("newprod-id").value = product.id;
        document.getElementById("newprod-name").value = product.name;
        document.getElementById("newprod-cat").value = product.category;
        document.getElementById("newprod-units").value = product.units;
        document.getElementById("newprod-price").value = product.price;

    }

    renderEditedProd(editedProd){
        document.getElementById(editedProd.id).children[1].innerHTML = editedProd.name;
        document.getElementById(editedProd.id).children[2].innerHTML = editedProd.category;
        document.getElementById(editedProd.id).children[3].innerHTML = editedProd.units;
        document.getElementById(editedProd.id).children[4].innerHTML = editedProd.price;
        document.getElementById(editedProd.id).children[5].innerHTML = editedProd.productImport().toFixed(2);
    }

    hideAllElements(){
        document.getElementById("almacen").classList.add("hideElement");
        document.getElementById('add-cat').parentElement.classList.add('hideElement');
        document.getElementById('new-prod').parentElement.classList.add('hideElement');
        document.getElementById("messages").innerHTML = "";
    }

    cleanForm(){
        document.getElementById('new-prod').reset();
    }

    apperAddProductView(){
        this.hideAllElements();
        document.getElementById('new-prod').parentElement.classList.remove('hideElement');
    }

    apperAddCategoryView(){
        this.hideAllElements();
        document.getElementById('add-cat').parentElement.classList.remove('hideElement');
    }

    apperAboutUsView(){
        this.hideAllElements();
        document.getElementById("messages").innerHTML = "<h1>Sobre Nosotros</h1><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero tempore alias eum officiis deserunt distinctio sint tenetur quod ex adipisci sit deleniti recusandae accusantium, corrupti quaerat nostrum officia nobis! Pariatur?</p>"
    }

    apperProductListView(){
        this.hideAllElements();
        document.getElementById("almacen").classList.remove("hideElement");
    }

    apperCategoryListView(){
        this.hideAllElements();
        document.getElementById("messages").innerHTML = "<h1>Listado Categorias</h1><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero tempore alias eum officiis deserunt distinctio sint tenetur quod ex adipisci sit deleniti recusandae accusantium, corrupti quaerat nostrum officia nobis! Pariatur?</p>"
    }
}

module.exports = View