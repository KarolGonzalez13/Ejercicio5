var nombre=document.getElementById("nombre");

nombre.addEventListener("blur",()=> {
    if(!regexNombre.test(nombre.value)){
        alert("Nombre no valido");
        
    }
})