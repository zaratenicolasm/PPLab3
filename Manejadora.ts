/// <reference path="Perro.ts" />
namespace PrimerParcial
{
    var xhttp : XMLHttpRequest = new XMLHttpRequest();

    export class Manejadora
    {
        //AGREGAR
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
        //MOSTRAR
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
            xhttp.open("POST", "./BACKEND/agregar_bd.php", true);
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
                    if (obj.FotoOK == true) {                        
                        console.log("Perro agregado en BD");                      
                        //MUESTRO TABLA ACTUALIZADA
                        PrimerParcial.Manejadora.MostrarPerrosJSON();
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }else{
                        console.error("El perro no se agrego en BD");
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                }
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
            var perro:Entidades.Perro= new Entidades.Perro(tamanio, edad, precio, nombre, raza, nombre+"_"+raza+".jpg");
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

                        alert("Perro agregado en BD");                      
                        //MUESTRO TABLA ACTUALIZADA
                        //PrimerParcial.Manejadora.MostrarPerrosJSON();
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }else if(obj.SeAgrego == false){
                        alert("El perro no se agrego, porque ya existe en BD");
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                }
            }
            //LIMPIO EL FORM
            PrimerParcial.Manejadora.LimpiarForm();
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