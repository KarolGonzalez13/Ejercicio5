const ConectarBD = require("./ConexionBD");

class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoUsuario(usuario){
        const sql="insert into usuario values(null,'"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"');";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario Insertado");
        } catch (error) {
            console.error("Usuario no insertado "+error);
            console.error(sql);
        }
    }
    async mostrarUsuarios(){
        const sql="SELECT * FROM usuario";
        var usuariosBD;
        try {
            await this.conectarMySql();
            [usuariosBD]= await this.conexion.execute(sql);
           
            await this.cerrarConexion();
            console.log("Usuarios recuperados");
            return usuariosBD;
        } catch (error) {
            console.log("Error al recuperar los datos de usuarios "+error);
            console.log(sql);
        }
    }
    async buscarUsuarioPorId(idusuario){
        const sql="select * from usuario where idusuario="+idusuario;
        try {
            await this.conectarMySql();
            const usuario=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario seleccionado");
            return usuario;
        } catch (error) {
            console.log("Error al recuperar el usuario "+error);
            console.log(sql);
        }
    }
    async editarUsuario(usuario){
        const sql2=`
        update usuario set
        nombre="${usuario.nombre}",
        celular="${usuario.celular}",
        correo="${usuario.correo}"
        where idusuario=${usuario.idusuario}
        `;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql2);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al editar usuario "+error);
            console.error(sql2);
        }
    }
    async borrarUsuario(idusuario){
        const sql="delete from usuario where idusuario="+idusuario;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al borrar al usuario"+ error);
            console.error(sql);
        }
    }
}

module.exports=UsuarioBD;