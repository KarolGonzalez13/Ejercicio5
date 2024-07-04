const ConectarBD = require("./ConexionBD");

class ProductoBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoProducto(producto){
        const sql="insert into producto values(null,'"+producto.nombre+"','"+producto.codigo+"','"+producto.descripcion+"','"+producto.costo+"');";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Producto Insertado");
        } catch (error) {
            console.error("Producto no insertado "+error);
            console.error(sql);
        }
    }
    async mostrarProducto(){
        const sql="SELECT * FROM producto";
        var productoBD;
        try {
            await this.conectarMySql();
            [productoBD]= await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Productos recuperados");
            return productoBD;
        } catch (error) {
            console.log("Error al recuperar los datos de productos "+error);
            console.log(sql);
        }
    }
    async buscarProductoId(idproducto){
        const sql="select * from producto where idproducto="+idproducto;
        try {
            await this.conectarMySql();
            const producto=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Producto seleccionado");
            return producto;
        } catch (error) {
            console.log("Error al recuperar el producto "+error);
            console.log(sql);
        }
    }
    async editarProducto(producto){
        const sql2=`
        update producto set
        nombre="${producto.nombre}",
        codigo="${producto.codigo}",
        descripcion="${producto.descripcion}",
        costo="${producto.costo}"
        where idproducto=${producto.idproducto}
        `;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql2);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al editar producto "+error);
            console.error(sql2);
        }
    }
    async borrarProducto(idproducto){
        const sql="delete from producto where idproducto="+idproducto;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al borrar el producto"+ error);
            console.error(sql);
        }
    }
}

module.exports=ProductoBD;