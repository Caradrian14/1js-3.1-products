'use strict';

const Controller = require("../controller/controller.class");

class View{
    init(){
        //const errMessege = getElementsByClassName('alert-dander');
        //errMessege.classList.add('.d-none');
    }

    // renderNewProduct2(prod){
    //     //let tbody = document.getElementsByTagName('tbody');
    //     let newTr = document.createElement('tr');
    //     newTr.innerHTML+=("<td>"+ prod.id + "</td><td>" + prod.name +"</td><td>" + prod.category + "</td><td>" + prod.units + "</td><td>" + prod.price + " €/u</td><td>" + prod.productImport() +" €</td><td></td>")
    //     document.getElementsByTagName('tbody').appendChild(newTr);
    // }

    renderNewProduct(prod){
        let newTrObject = document.createElement('tr');
        newTrObject.id = prod.id;
        newTrObject.innerHTML+= ("<td>" + prod.id +"</td><td>"+ prod.name +"</td><td>" + prod.category +"</td><td>"+ prod.units + "</td><td>" + prod.price + "</td><td>" + prod.productImport() + "</td>");
        document.getElementById('tableProducts').appendChild(newTrObject);
    }

    renderNewcategory(cat){
        let selectorCategories = document.getElementById("newprod-cat");
        
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
        messageDiv.appendChild(divAlert);
        
    }

    // addProduct(product){
    //     let tbody = getElementById("tableProducts");
    //     let newRow = tbody.createElement("tr");
    //     newRow.setAttribute("id", product.id);
    //     let elementsRow = newRow.createElement("<td>" + product.id + "</td><td>" +
    //     product.name + "</td><td>" + product.category + "</td><td>" + product.price +
    //     + "</td><td>" + product.units + "</td><td>" + product.productImport() + "</td><td>" + "</td>");
    //     tbody.append(elementsRow);
    // }

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
}

module.exports = View