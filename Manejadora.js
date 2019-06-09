"use strict";
/// <reference path="Perro.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var xhttp = new XMLHttpRequest();
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        //AGREGAR
        Manejadora.AgregarPerroJSON = function () {
            //PREVEER QUE MANDEN VACIO
            //RECUPERO
            var tamanio = document.getElementById("txtTamanio").value;
            var edad = parseInt(document.getElementById("txtEdad").value);
            var precio = parseInt(document.getElementById("txtPrecio").value);
            var nombre = document.getElementById("txtNombre").value;
            var raza = document.getElementById("cboRaza").value;
            //let hidden:string=(<HTMLInputElement>document.getElementById("hdnIdModificacion")).value;
            //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
            var foto = document.getElementById("foto");
            //GENERO EL OBJETO PERRO
            var perro = new Entidades.Perro(tamanio, edad, precio, nombre, raza, nombre + "_" + raza + ".jpg");
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //==================================================================================
            //INSTANCIO OBJETO FORMDATA
            var form = new FormData();
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
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var obj = JSON.parse(xhttp.responseText);
                    //INFORMO SI SE AGREGO O NO
                    if (obj.TodoOK == true) {
                        console.log("Perro agregado");
                        //MUESTRO TABLA ACTUALIZADA
                        PrimerParcial.Manejadora.MostrarPerrosJSON();
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                    else {
                        console.error("El perro no se agrego");
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                }
            };
            //LIMPIO EL FORM
            PrimerParcial.Manejadora.LimpiarForm();
        };
        //MOSTRAR
        Manejadora.MostrarPerrosJSON = function () {
            //PONGO LA IMAGEN POR DEFECTO
            document.getElementById("imgFoto").src = "./BACKEND/huella.jpg";
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //aAJAX POST
            xhttp.open("POST", "./BACKEND/traer_json.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            //ENVIO LA PETICION
            xhttp.send();
            //VUELTA
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var obj = JSON.parse(xhttp.responseText);
                    var tabla = "<table border=4><tr><td>TAMAÑO</td><td>EDAD</td><td>PRECIO</td><td>NOMBRE</td><td>RAZA</td><td>FOTO</td></tr>";
                    console.log("Muestro lista por pantalla");
                    for (var i = 0; i < obj.length; i++) {
                        tabla += "<tr><td>" + obj[i].tamanio + "</td><td>" + obj[i].edad + "</td><td>" + obj[i].precio + "</td><td>" + obj[i].nombre + "</td><td>" + obj[i].raza + "</td><td><img src='./BACKEND/fotos/" + obj[i].foto + "' width='50px' height='50px'></td></tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                    //OCULTO EL GIF
                    PrimerParcial.Manejadora.AdministrarGif(false);
                }
            };
        };
        //AGREGAR BD
        Manejadora.AgregarPerroEnBaseDatos = function () {
            //PREVEER QUE MANDEN VACIO
            //RECUPERO
            var tamanio = document.getElementById("txtTamanio").value;
            var edad = parseInt(document.getElementById("txtEdad").value);
            var precio = parseInt(document.getElementById("txtPrecio").value);
            var nombre = document.getElementById("txtNombre").value;
            var raza = document.getElementById("cboRaza").value;
            //let hidden:string=(<HTMLInputElement>document.getElementById("hdnIdModificacion")).value;
            //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
            var foto = document.getElementById("foto");
            //GENERO EL OBJETO PERRO
            var perro = new Entidades.Perro(tamanio, edad, precio, nombre, raza, nombre + "_" + raza + ".jpg");
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //==================================================================================
            //INSTANCIO OBJETO FORMDATA
            var form = new FormData();
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
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var obj = JSON.parse(xhttp.responseText);
                    //INFORMO SI SE AGREGO O NO
                    if (obj.FotoOK == true) {
                        console.log("Perro agregado en BD");
                        //MUESTRO TABLA ACTUALIZADA
                        PrimerParcial.Manejadora.MostrarPerrosBaseDatos();
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                    else {
                        console.error("El perro no se agrego en BD");
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                }
            };
            //LIMPIO EL FORM
            PrimerParcial.Manejadora.LimpiarForm();
        };
        //MOSTRAR BD
        Manejadora.MostrarPerrosBaseDatos = function () {
            //PONGO LA IMAGEN POR DEFECTO
            document.getElementById("imgFoto").src = "./BACKEND/huella.jpg";
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //aAJAX POST
            xhttp.open("POST", "./BACKEND/traer_bd.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            //ENVIO LA PETICION
            xhttp.send();
            //VUELTA
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var obj = JSON.parse(xhttp.responseText);
                    var tabla = "<table border=4><tr><td>TAMAÑO</td><td>EDAD</td><td>PRECIO</td><td>NOMBRE</td><td>RAZA</td><td>FOTO</td></tr>";
                    console.log("Muestro lista por pantalla");
                    for (var i = 0; i < obj.length; i++) {
                        tabla += "<tr><td>" + obj[i].tamanio + "</td><td>" + obj[i].edad + "</td><td>" + obj[i].precio + "</td><td>" + obj[i].nombre + "</td><td>" + obj[i].raza + "</td><td><img src='./BACKEND/fotos/" + obj[i].foto + "' width='50px' height='50px'></td></tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                    //OCULTO EL GIF
                    PrimerParcial.Manejadora.AdministrarGif(false);
                }
            };
        };
        //VERIFICAR Y AGREGAR BD
        Manejadora.VerificarYAgregarBD = function () {
            //PREVEER QUE MANDEN VACIO
            //RECUPERO
            var tamanio = document.getElementById("txtTamanio").value;
            var edad = parseInt(document.getElementById("txtEdad").value);
            var precio = parseInt(document.getElementById("txtPrecio").value);
            var nombre = document.getElementById("txtNombre").value;
            var raza = document.getElementById("cboRaza").value;
            //let hidden:string=(<HTMLInputElement>document.getElementById("hdnIdModificacion")).value;
            //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
            var foto = document.getElementById("foto");
            //GENERO EL OBJETO PERRO
            var perro = new Entidades.Perro(tamanio, edad, precio, nombre, raza, nombre + "_" + raza + ".jpg");
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //==================================================================================
            //INSTANCIO OBJETO FORMDATA
            var form = new FormData();
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
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var obj = JSON.parse(xhttp.responseText);
                    //INFORMO SI SE AGREGO O NO
                    if (obj.SeAgrego == true) {
                        console.log("Perro agregado en BD");
                        //MUESTRO TABLA ACTUALIZADA
                        PrimerParcial.Manejadora.MostrarPerrosBaseDatos();
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                    else if (obj.SeAgrego == false) {
                        console.log("El perro no se agrego, porque ya existe en BD");
                        alert("El perro no se agrego, porque ya existe en BD");
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                }
            };
            //LIMPIO EL FORM
            PrimerParcial.Manejadora.LimpiarForm();
        };
        //======================================================================
        //=========================GIF Y LIMPIAR================================
        //======================================================================
        Manejadora.AdministrarGif = function (mostrar) {
            var gif = "./BACKEND/gif-load.gif";
            var div = document.getElementById("divSpinner");
            var img = document.getElementById("imgSpinner");
            if (mostrar) {
                div.style.display = "block";
                div.style.top = "50%";
                div.style.left = "45%";
                img.src = gif;
            }
            if (!mostrar) {
                div.style.display = "none";
                img.src = "";
            }
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById("txtTamanio").value = "";
            document.getElementById("cboRaza").value = "Azul";
            document.getElementById("txtEdad").value = "";
            document.getElementById("txtPrecio").value = "";
            document.getElementById("txtNombre").value = "";
            document.getElementById("foto").value = "";
            document.getElementById("hdnIdModificacion").value = "";
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map