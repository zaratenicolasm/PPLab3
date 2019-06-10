/// <reference path="Perro.ts" />
namespace PrimerParcial
{
    export interface IParte2
    {
        EliminarPerro(objJson : any) : void;
        ModificarPerro(objJson : any) : void;
        ObtenerPerrosPorTamanio() : void;
    }

    var xhttp : XMLHttpRequest = new XMLHttpRequest();

    export class Manejadora implements PrimerParcial.IParte2
    {
        //AGREGAR JSON
        public static AgregarPerroJSON() : void
        {
            //PREVEER QUE MANDEN VACIO
            //RECUPERO
            let tamanio:string=(<HTMLInputElement>document.getElementById("txtTamanio")).value;
            let edad:number=parseInt((<HTMLInputElement>document.getElementById("txtEdad")).value);
            let precio:number=parseInt((<HTMLInputElement>document.getElementById("txtPrecio")).value);
            let nombre:string=(<HTMLInputElement>document.getElementById("txtNombre")).value;
            let raza:string=(<HTMLInputElement>document.getElementById("cboRaza")).value;            
            //let hidden:string=(<HTMLInputElement>document.getElementById("hdnIdModificacion")).value;
            //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            //GENERO EL OBJETO PERRO
            var perro:Entidades.Perro= new Entidades.Perro(tamanio, edad, precio, nombre, raza, nombre+"_"+raza+".jpg");
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //==================================================================================
            //INSTANCIO OBJETO FORMDATA
            let form : FormData = new FormData();
            //AJAX POST
            xhttp.open("POST", "./BACKEND/agregar_json.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            //==================AGREGO PARAMETROS AL FORMDATA:===================================
            //PARAMETRO RECUPERADO POR $_FILES
            form.append('foto', foto.files[0]);
            //OBJETO PERRO
            form.append('cadenaJson', JSON.stringify(perro.ToJson()));
            //ENVIO DE LA PETICION
            xhttp.send(form);
            //VUELTA
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let obj : any = JSON.parse(xhttp.responseText);                    
                    //INFORMO SI SE AGREGO O NO
                    if (obj.TodoOK == true) {                        
                        console.log("Perro agregado");                      
                        //MUESTRO TABLA ACTUALIZADA
                        PrimerParcial.Manejadora.MostrarPerrosJSON();
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }else{
                        console.error("El perro no se agrego");
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                }
            }
            //LIMPIO EL FORM
            PrimerParcial.Manejadora.LimpiarForm();
        }
        //MOSTRAR JSON
        public static MostrarPerrosJSON() : void
        {
            //PONGO LA IMAGEN POR DEFECTO
            (<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/huella.jpg";
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //aAJAX POST
            xhttp.open("POST", "./BACKEND/traer_json.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            //ENVIO LA PETICION
            xhttp.send();            
            //VUELTA
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    var obj : any[]= JSON.parse(xhttp.responseText);
                    var tabla : string = "<table border=4><tr><td>TAMAÑO</td><td>EDAD</td><td>PRECIO</td><td>NOMBRE</td><td>RAZA</td><td>FOTO</td></tr>";

                    console.log("Muestro lista por pantalla");
                    
                    for(let i=0; i<obj.length; i++){
                        
                        tabla += "<tr><td>"+ obj[i].tamanio +"</td><td>"+ obj[i].edad +"</td><td>"+ obj[i].precio +"</td><td>"+ obj[i].nombre +"</td><td>"+ obj[i].raza +"</td><td><img src='./BACKEND/fotos/"+ obj[i].foto +"' width='50px' height='50px'></td></tr>";
                        
                    }
                    
                    tabla +="</table>";
                    
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = tabla;

                    //OCULTO EL GIF
                    PrimerParcial.Manejadora.AdministrarGif(false);
                    
                }
            }            
        }  

        //AGREGAR BD
        public static AgregarPerroEnBaseDatos() : void
        {           
            //PREVEER QUE MANDEN VACIO
            //RECUPERO
            let tamanio:string=(<HTMLInputElement>document.getElementById("txtTamanio")).value;
            let edad:number=parseInt((<HTMLInputElement>document.getElementById("txtEdad")).value);
            let precio:number=parseInt((<HTMLInputElement>document.getElementById("txtPrecio")).value);
            let nombre:string=(<HTMLInputElement>document.getElementById("txtNombre")).value;
            let raza:string=(<HTMLInputElement>document.getElementById("cboRaza")).value; 
            //RECUPERO EL HIDDEN PARA SABER SI ES MODIFICAR O AGREGAR           
            let hidden:string=(<HTMLInputElement>document.getElementById("hdnIdModificacion")).value;
            //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            //GENERO EL OBJETO PERRO
            var perro:Entidades.Perro= new Entidades.Perro(tamanio, edad, precio, nombre, raza, nombre+"_"+raza);
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //==================================================================================
            //INSTANCIO OBJETO FORMDATA
            let form : FormData = new FormData();
            //AJAX POST
            if (hidden == "Mod") {
                xhttp.open("POST", "./BACKEND/modificar_bd.php", true);
            }else{
                xhttp.open("POST", "./BACKEND/agregar_bd.php", true);
            }
            
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            //==================AGREGO PARAMETROS AL FORMDATA:===================================
            //PARAMETRO RECUPERADO POR $_FILES
            form.append('foto', foto.files[0]);
            //OBJETO PERRO
            form.append('cadenaJson', JSON.stringify(perro.ToJson()));
            //ENVIO DE LA PETICION
            xhttp.send(form);
            //VUELTA
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let obj : any = JSON.parse(xhttp.responseText);                    
                    //INFORMO SI SE AGREGO O NO
                    if (obj.TodoOK == true) {  
                        if(hidden == "Mod"){
                            console.log("Perro modificado en BD");
                        }else{
                            console.log("Perro agregado en BD");
                        }                      
                        //MUESTRO TABLA ACTUALIZADA
                        PrimerParcial.Manejadora.MostrarPerrosBaseDatos();
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }else{
                        if (hidden == "Mod") {
                            console.error("El perro no se modifico en BD");
                        }else{
                            console.error("El perro no se agrego en BD");
                        }     
                        //MUESTRO TABLA ACTUALIZADA
                        PrimerParcial.Manejadora.MostrarPerrosBaseDatos();                   
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                }
            }
            //SI ENTRE POR MODIFICAR RESTAURO VALORES    
            if (hidden == "Mod"){
                //HDN A VACIO
                (<HTMLInputElement>document.getElementById("hdnIdModificacion")).value = "";
                //DEJO MODIFICAR EL NOMBRE
                (<HTMLInputElement>document.getElementById("txtNombre")).readOnly = false;
                //CAMBIO EL NOMBRE DEL BOTON
                (<HTMLInputElement>document.getElementById("idAgregarBD")).value = "Agregar en BD";
                //IMG POR DEFECTO
                (<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/huella.jpg";
                
            }
            //LIMPIO EL FORM
            PrimerParcial.Manejadora.LimpiarForm();
        }

        //MOSTRAR BD
        public static MostrarPerrosBaseDatos() : void
        {
            //PONGO LA IMAGEN POR DEFECTO
            (<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/huella.jpg";
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //aAJAX POST
            xhttp.open("POST", "./BACKEND/traer_bd.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            //ENVIO LA PETICION
            xhttp.send();            
            //VUELTA
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    var obj : any[]= JSON.parse(xhttp.responseText);
                    var tabla : string = "<table border=4><tr><td>TAMAÑO</td><td>EDAD</td><td>PRECIO</td><td>NOMBRE</td><td>RAZA</td><td>FOTO</td><td colspan='2'>ACCIONES</td></tr>";

                    console.log("Muestro lista por pantalla");
                    
                    for(let i=0; i<obj.length; i++){
                        
                        tabla += "<tr><td>"+ obj[i].tamanio +"</td><td>"+ obj[i].edad +"</td><td>"+ obj[i].precio +"</td><td>"+ obj[i].nombre +"</td><td>"+ obj[i].raza +"</td><td><img src='./BACKEND/"+ obj[i].foto +"' width='50px' height='50px'></td>"+
                        "<td><input type='button' value='Eliminar' onclick='PrimerParcial.Manejadora.Eliminar("+JSON.stringify(obj[i])+")'></td><td><input type='button' value='Modificar' onclick='PrimerParcial.Manejadora.Modificar("+JSON.stringify(obj[i])+")'></td></tr>";
                        
                    }
                    
                    tabla +="</table>";
                    
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = tabla;

                    //OCULTO EL GIF
                    PrimerParcial.Manejadora.AdministrarGif(false);
                    
                }
            }
        }
        //VERIFICAR Y AGREGAR BD
        public static VerificarYAgregarBD() : void 
        {
            //PREVEER QUE MANDEN VACIO
            //RECUPERO
            let tamanio:string=(<HTMLInputElement>document.getElementById("txtTamanio")).value;
            let edad:number=parseInt((<HTMLInputElement>document.getElementById("txtEdad")).value);
            let precio:number=parseInt((<HTMLInputElement>document.getElementById("txtPrecio")).value);
            let nombre:string=(<HTMLInputElement>document.getElementById("txtNombre")).value;
            let raza:string=(<HTMLInputElement>document.getElementById("cboRaza")).value;            
            //let hidden:string=(<HTMLInputElement>document.getElementById("hdnIdModificacion")).value;
            //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            //GENERO EL OBJETO PERRO
            var perro:Entidades.Perro= new Entidades.Perro(tamanio, edad, precio, nombre, raza, nombre+"_"+raza);
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //==================================================================================
            //INSTANCIO OBJETO FORMDATA
            let form : FormData = new FormData();
            //AJAX POST
            xhttp.open("POST", "./BACKEND/verificar_bd.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            //==================AGREGO PARAMETROS AL FORMDATA:===================================
            //PARAMETRO RECUPERADO POR $_FILES
            form.append('foto', foto.files[0]);
            //OBJETO PERRO
            form.append('cadenaJson', JSON.stringify(perro.ToJson()));
            //ENVIO DE LA PETICION
            xhttp.send(form);
            //VUELTA
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let obj : any = JSON.parse(xhttp.responseText);                    
                    //INFORMO SI SE AGREGO O NO
                    if (obj.SeAgrego == true) {  

                        console.log("Perro agregado en BD");                      
                        //MUESTRO TABLA ACTUALIZADA
                        PrimerParcial.Manejadora.MostrarPerrosBaseDatos();
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }else if(obj.SeAgrego == false){
                        console.log("El perro no se agrego, porque ya existe en BD");
                        alert("El perro no se agrego, porque ya existe en BD");
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                }
            }
            //LIMPIO EL FORM
            PrimerParcial.Manejadora.LimpiarForm();
        }
        //ELIMINIAR BD
        public static Eliminar(objJson : any) : void
        {
            var unaManejadora : PrimerParcial.Manejadora = new PrimerParcial.Manejadora();
            unaManejadora.EliminarPerro(objJson);
        }
        public EliminarPerro(objJson : any) : void
        {
            //CONFIRMACION
            var opcion :boolean;
            opcion = confirm("Esta seguro que desea eliminar a "+ objJson.nombre +" "+ objJson.raza + "?");
            //PONGO LA IMAGEN POR DEFECTO
            (<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/huella.jpg";
            //VERIFICO CONFIRMACION
            if (opcion == true) {
                //LANZO GIF
                PrimerParcial.Manejadora.AdministrarGif(true);                    
                //AJAX POST
                xhttp.open("POST", "./BACKEND/eliminar_bd.php", true);
                xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                //ENVIO LA PETICION
                xhttp.send("caso=eliminar&cadenaJson="+ JSON.stringify(objJson));
                //VUELTA
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        let obj : any = JSON.parse(xhttp.responseText); 
    
                        if (obj.TodoOK == true) {
                            console.log("Perro eliminado");
                            //ACTUALIZO LA TABLA
                            PrimerParcial.Manejadora.MostrarPerrosBaseDatos();
                            //OCULTO EL GIF
                            PrimerParcial.Manejadora.AdministrarGif(false);
                        }else if(obj.TodoOK == false){
                            console.error("El perro no se pudo eliminar");
                            //OCULTO EL GIF
                            PrimerParcial.Manejadora.AdministrarGif(false);
                        }                      
                    }
                }
            }

        }
        //MODIFICAR BD
        public static Modificar(objJson : any) : void
        {
            var unaManejadora : PrimerParcial.Manejadora = new PrimerParcial.Manejadora();
            unaManejadora.ModificarPerro(objJson);
        }
        public ModificarPerro(objJson : any) : void
        {
            //MUESTRO TODOS LOS ELEMENTOS EN EL INDEX
            (<HTMLInputElement>document.getElementById("txtTamanio")).value = objJson.tamanio;
            (<HTMLInputElement>document.getElementById("txtEdad")).value = objJson.edad;
            (<HTMLInputElement>document.getElementById("txtPrecio")).value = objJson.precio;
            (<HTMLInputElement>document.getElementById("txtNombre")).value = objJson.nombre;
            (<HTMLInputElement>document.getElementById("cboRaza")).value = objJson.raza;
            (<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/"+objJson.foto;
            
            //CAMBIO EL NOMBRE AL BOTON AGREGAR DANDOLE UN ID
            (<HTMLInputElement>document.getElementById("idAgregarBD")).value = "Modificar en BD";
            //SETEO EL HIDEN
            (<HTMLInputElement>document.getElementById("hdnIdModificacion")).value = "Mod";
            //NO DEJO MODIFICAR EL NOMBRE
            (<HTMLInputElement>document.getElementById("txtNombre")).readOnly = true;     
        }
        //OBTENER PERROS POR TAMAÑO BD
        public static OPPT() : void
        {
            var unaManejadora : PrimerParcial.Manejadora = new PrimerParcial.Manejadora();
            unaManejadora.ObtenerPerrosPorTamanio(); 
        }        
        public ObtenerPerrosPorTamanio() : void
        {
            PrimerParcial.Manejadora.AdministrarGif(true);
            //aAJAX POST
            xhttp.open("POST", "./BACKEND/perros_x_tamanio_bd.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            //ENVIO LA PETICION
            xhttp.send();            
            //VUELTA
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    //MUESTRO
                    console.log(xhttp.responseText);
                    //OCULTO EL GIF
                    PrimerParcial.Manejadora.AdministrarGif(false);
                }                
            }
        }
        //======================================================================
        //=========================GIF Y LIMPIAR================================
        //======================================================================
        public static AdministrarGif(mostrar:boolean) : void {

            var gif : string = "./BACKEND/gif-load.gif";
            let div = <HTMLDivElement> document.getElementById("divSpinner");
            let img = <HTMLImageElement> document.getElementById("imgSpinner");
    
            if(mostrar){
                div.style.display = "block";
                div.style.top = "50%";
                div.style.left = "45%"
                img.src = gif;
            }
    
            if(!mostrar){
                div.style.display = "none";
                img.src = "";
            }
        }
        public static LimpiarForm():void{
            (<HTMLInputElement>document.getElementById("txtTamanio")).value="";
            (<HTMLInputElement>document.getElementById("cboRaza")).value="Azul";
            (<HTMLInputElement>document.getElementById("txtEdad")).value="";
            (<HTMLInputElement>document.getElementById("txtPrecio")).value="";
            (<HTMLInputElement>document.getElementById("txtNombre")).value="";
            (<HTMLInputElement>document.getElementById("foto")).value="";
            (<HTMLInputElement>document.getElementById("hdnIdModificacion")).value="";
        }
    }
}