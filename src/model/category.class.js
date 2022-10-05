// Aquí la clase Category

class Category{
    constructor(id, name, description = "No hay descripción"){
        this.id = id;
        this.name = name;
        this.description = description;
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getDescripcion(){
        return this.description;
    }
    toString(){
        return "Producto numero " + id + " llamada: " + this.name +  ", con la descripcion siendo: " + this.description;
    }
}
module.exports = Category
