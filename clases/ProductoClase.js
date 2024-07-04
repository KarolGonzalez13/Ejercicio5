const { text } = require("express");

class Producto{
    constructor(producto){
        this.id=producto.idproducto,
        this.nombre=producto.nombre,
        this.codigo=producto.codigo,
        this.descripcion=producto.descripcion,
        this.costo=producto.costo
    }
    set id(id){
        this._id=id;
    }
    set nombre(nombre){
            this._nombre=nombre;  
    }
    set codigo(codigo){
            this._codigo=codigo;
    }
    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }
    set costo(costo) {
            this._costo = costo;
    }
    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get codigo(){
        return this._codigo;
    }
    get descripcion(){
        return this._descripcion;
    }
    get costo(){
        return this._costo;
    }
    get obtenerProductos(){
        return{
            idproducto:this.id,
            nombre:this.nombre,
            codigo:this.codigo,
            descripcion:this.descripcion,
            costo:this.costo
        }
    }
}

module.exports=Producto;

