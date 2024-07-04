const ruta = require("express").Router();
const UsuarioClase=require("../clases/UsuarioClase");
const UsuarioBD = require("../bd/UsuarioBD");

ruta.get("/", async(req,res)=>{
    const usuariobd=new UsuarioBD();
    var usuario=await usuariobd.mostrarUsuarios();
    //console.log(usuario);
    var usuariosCorrectos=[];
    usuario.forEach(usuario =>{
    const usuario1 = new UsuarioClase (usuario);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        usuariosCorrectos.push(usuario1.obtenerDatos);
    }
    });
    res.render("mostrarUsuarios", {usuariosCorrectos});
});

ruta.get("/agregarUsuario", (req,res)=>{
    res.render("formulario");
});

ruta.post("/agregarUsuario",(req,res)=>{
    console.log(req.body);
    const usuario1=new UsuarioClase(req.body);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd = new UsuarioBD();
        usuariobd.nuevoUsuario(usuario1.obtenerDatos);
        res.render("mostrarDatos", usuario1.obtenerDatos);
    }else{
        res.render("error");
    }
});

ruta.get("/editarUsuario/:idusuario", async(req,res)=>{
    const usuariobd = new UsuarioBD();
    const [[usuario]]= await usuariobd.buscarUsuarioPorId(req.params.idusuario);
    console.log(usuario);
    res.render("editarUsuario",usuario);
});

ruta.post("/editarUsuario", async(req,res)=>{
    const usuariobd = new UsuarioBD();
    const usuario1 = new UsuarioClase(req.body);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        await usuariobd.editarUsuario(req.body);
        res.redirect("/");
    }
    
});

ruta.get("/borrarUsuario/:idiusuario", async(req,res)=>{
    const usuariobd = new UsuarioBD();
    await usuariobd.borrarUsuario(req.params.idiusuario);
    res.redirect("/");
});

const ProductoClase = require("../clases/ProductoClase");
const ProductoBD = require("../bd/ProductoBD");


ruta.get("/producto", async (req, res) => {
    const productobd = new ProductoBD();
    var producto = await productobd.mostrarProducto();
    var productosCorrectos=[];
    producto.forEach(producto => {
        const producto1 = new ProductoClase(producto);
        if (producto1.nombre!=undefined && producto1.codigo!=undefined && producto1.descripcion!=undefined && producto1.costo!=undefined) {
            productosCorrectos.push(producto1.obtenerProductos);
        }
    });
    res.render("mostrarProducto", { productosCorrectos });
});


ruta.get("/agregarProducto", (req, res) => {
    res.render("formularioProducto");
    console.log(req.body);
});


ruta.post("/agregarProducto", (req, res) => {
    console.log(req.body);
    const producto1 = new ProductoClase(req.body);
    console.log(producto1);
    if (producto1.nombre!=undefined && producto1.codigo!=undefined && producto1.descripcion!=undefined && producto1.costo!=undefined) {
        const productobd = new ProductoBD();
        productobd.nuevoProducto(producto1.obtenerProductos);
        res.render("mostrarDatosProd", producto1.obtenerProductos);
    } else {
        res.render("error");
    }
});


ruta.get("/editarProducto/:idproducto", async (req, res) => {
    const productobd = new ProductoBD();
    const [[producto]] = await productobd.buscarProductoId(req.params.idproducto);
    console.log(producto);
    res.render("editarProducto", producto);
});


ruta.post("/editarProducto", async (req, res) => {
    const productobd = new ProductoBD();
    const producto1 = new ProductoClase(req.body);
    if (producto1.nombre!=undefined && producto1.codigo!=undefined && producto1.descripcion!=undefined && producto1.costo!=undefined) {
        await productobd.editarProducto(req.body);
        res.redirect("/producto");
    }
});


ruta.get("/borrarProducto/:idproducto", async (req, res) => {
    const productobd = new ProductoBD();
    await productobd.borrarProducto(req.params.idproducto);
    res.redirect("/producto");
});

module.exports=ruta;
