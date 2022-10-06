'use strict';

const Controller = require("../controller/controller.class");

class View{
    init(){}

    

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
}

module.exports = View