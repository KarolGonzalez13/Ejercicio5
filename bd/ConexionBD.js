require('dotenv').config();
class ConectarBD{
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2/promise");
    }
    async conectarMySql(){
        console.log("--------------------");
        console.log(process.env.HOSTMYSQL);
        console.log(process.env.USERMYSQL);
        console.log(process.env.PASSWORDMYSQL);
        console.log(process.env.DATABASEMYSQL);
        console.log(process.env.PORTMYSQL);
        console.log("--------------------");  
        try {
            this.conexion=await this.mysql.createConnection({
                host:process.env.HOSTMYSQL,
                user:process.env.USERMYSQL,
                password:process.env.PASSWORDMYSQL,
                database:process.env.DATABASEMYSQL,
                port:process.env.PORTMYSQL
               /* host:'b24qezuurldklj4tl6ze-mysql.services.clever-cloud.com',
                user:'usbuycynw1dthckh',
                password:'y7fEn5TnoajMgTTGvk3t',
                database:'b24qezuurldklj4tl6ze',
                port:'3306'*/
            });
          
            console.log("Conexion creada a mysql");
        } catch (error) {
            console.error("Error al crear la conexion "+error);
        }
    }
    async cerrarConexion(){
        if(this.conexion!=null){
            try {
                await this.conexion.end();
                console.log("Se cerro la conexion de Mysql");
            } catch (error) {
                console.error("Error de cierre de conexion "+error);
            }
        }
    }
}


module.exports=ConectarBD;