// Aquí la clase Product

class Product{
    constructor(id, name, category, price, units = 0){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        if(units% 1 === 0){
            this.units = units;
        }else{
            throw "Error, ha de ser unidades enteras"
        }
        
    }
    getCategory(){
        return this.category;
    }
    productImport(){
        return (this.price * this.units)
    }
    toString(){
        return (this.name) + ": " +this.units + " uds. x " + this.price + " €/u = " + (this.price * this.units) + " €";
    }
}

module.exports = Product

