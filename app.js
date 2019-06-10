var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Mascota = /** @class */ (function () {
        function Mascota(tamanio, edad, precio) {
            this._tamanio = tamanio;
            this._edad = edad;
            this._precio = precio;
        }
        Mascota.prototype.ToString = function () {
            var str = '"tamanio" : "' + this._tamanio + '", "edad" : ' + this._edad + ', "precio" : ' + this._precio;
            return str;
        };
        return Mascota;
    }());
    Entidades.Mascota = Mascota;
})(Entidades || (Entidades = {}));
/// <reference path="Mascota.ts" />
var Entidades;
(function (Entidades) {
    var Perro = /** @class */ (function (_super) {
        __extends(Perro, _super);
        function Perro(tamanio, edad, precio, nombre, raza, foto) {
            var _this = _super.call(this, tamanio, edad, precio) || this;
            _this._nombre = nombre;
            _this._raza = raza;
            _this._pathFoto = foto;
            return _this;
        }
        Perro.prototype.ToJson = function () {
            var str = '{ ' + _super.prototype.ToString.call(this) + ', "nombre" : "' + this._nombre + '", "raza" : "' + this._raza + '", "foto" : "' + this._pathFoto + '" }';
            var obj = JSON.parse(str);
            return obj;
        };
        return Perro;
    }(Entidades.Mascota));
    Entidades.Perro = Perro;
})(Entidades || (Entidades = {}));
/// <reference path="Perro.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var xhttp = new XMLHttpRequest();
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        //AGREGAR JSON
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
        //MOSTRAR JSON
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
            //RECUPERO EL HIDDEN PARA SABER SI ES MODIFICAR O AGREGAR           
            var hidden = document.getElementById("hdnIdModificacion").value;
            //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
            var foto = document.getElementById("foto");
            //GENERO EL OBJETO PERRO
            var perro = new Entidades.Perro(tamanio, edad, precio, nombre, raza, nombre + "_" + raza);
            //MUESTRO EL GIF
            PrimerParcial.Manejadora.AdministrarGif(true);
            //==================================================================================
            //INSTANCIO OBJETO FORMDATA
            var form = new FormData();
            //AJAX POST
            if (hidden == "Mod") {
                xhttp.open("POST", "./BACKEND/modificar_bd.php", true);
            }
            else {
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
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    /*let obj : any = JSON.parse(xhttp.responseText);
                    //INFORMO SI SE AGREGO O NO
                    if (obj.FotoOK == true) {
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
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }*/
                }
            };
            //SI ENTRE POR MODIFICAR RESTAURO VALORES    
            if (hidden == "Mod") {
                //HDN A VACIO
                document.getElementById("hdnIdModificacion").value = "";
                //DEJO MODIFICAR EL NOMBRE
                document.getElementById("txtNombre").readOnly = false;
                //CAMBIO EL NOMBRE DEL BOTON
                document.getElementById("idAgregarBD").value = "Agregar en BD";
                //IMG POR DEFECTO
                document.getElementById("imgFoto").src = "./BACKEND/huella.jpg";
            }
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
                    var tabla = "<table border=4><tr><td>TAMAÑO</td><td>EDAD</td><td>PRECIO</td><td>NOMBRE</td><td>RAZA</td><td>FOTO</td><td colspan='2'>ACCIONES</td></tr>";
                    console.log("Muestro lista por pantalla");
                    for (var i = 0; i < obj.length; i++) {
                        tabla += "<tr><td>" + obj[i].tamanio + "</td><td>" + obj[i].edad + "</td><td>" + obj[i].precio + "</td><td>" + obj[i].nombre + "</td><td>" + obj[i].raza + "</td><td><img src='./BACKEND/" + obj[i].foto + "' width='50px' height='50px'></td>" +
                            "<td><input type='button' value='Eliminar' onclick='PrimerParcial.Manejadora.Eliminar(" + JSON.stringify(obj[i]) + ")'></td><td><input type='button' value='Modificar' onclick='PrimerParcial.Manejadora.Modificar(" + JSON.stringify(obj[i]) + ")'></td></tr>";
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
            var perro = new Entidades.Perro(tamanio, edad, precio, nombre, raza, nombre + "_" + raza);
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
        //ELIMINIAR BD
        Manejadora.Eliminar = function (objJson) {
            var unaManejadora = new PrimerParcial.Manejadora();
            unaManejadora.EliminarPerro(objJson);
        };
        Manejadora.prototype.EliminarPerro = function (objJson) {
            //CONFIRMACION
            var opcion;
            opcion = confirm("Esta seguro que desea eliminar a " + objJson.nombre + " " + objJson.raza + "?");
            //PONGO LA IMAGEN POR DEFECTO
            document.getElementById("imgFoto").src = "./BACKEND/huella.jpg";
            //VERIFICO CONFIRMACION
            if (opcion == true) {
                //LANZO GIF
                PrimerParcial.Manejadora.AdministrarGif(true);
                //AJAX POST
                xhttp.open("POST", "./BACKEND/eliminar_bd.php", true);
                xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                //ENVIO LA PETICION
                xhttp.send("caso=eliminar&cadenaJson=" + JSON.stringify(objJson));
                //VUELTA
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        var obj = JSON.parse(xhttp.responseText);
                        if (obj.TodoOK == true) {
                            console.log("Perro eliminado");
                            //ACTUALIZO LA TABLA
                            PrimerParcial.Manejadora.MostrarPerrosBaseDatos();
                            //OCULTO EL GIF
                            PrimerParcial.Manejadora.AdministrarGif(false);
                        }
                        else if (obj.TodoOK == false) {
                            console.error("El perro no se pudo eliminar");
                            //OCULTO EL GIF
                            PrimerParcial.Manejadora.AdministrarGif(false);
                        }
                    }
                };
            }
        };
        //MODIFICAR BD
        Manejadora.Modificar = function (objJson) {
            var unaManejadora = new PrimerParcial.Manejadora();
            unaManejadora.ModificarPerro(objJson);
        };
        Manejadora.prototype.ModificarPerro = function (objJson) {
            //MUESTRO TODOS LOS ELEMENTOS EN EL INDEX
            document.getElementById("txtTamanio").value = objJson.tamanio;
            document.getElementById("txtEdad").value = objJson.edad;
            document.getElementById("txtPrecio").value = objJson.precio;
            document.getElementById("txtNombre").value = objJson.nombre;
            document.getElementById("cboRaza").value = objJson.raza;
            document.getElementById("imgFoto").src = "./BACKEND/" + objJson.foto;
            //CAMBIO EL NOMBRE AL BOTON AGREGAR DANDOLE UN ID
            document.getElementById("idAgregarBD").value = "Modificar en BD";
            //SETEO EL HIDEN
            document.getElementById("hdnIdModificacion").value = "Mod";
            //NO DEJO MODIFICAR EL NOMBRE
            document.getElementById("txtNombre").readOnly = true;
        };
        //OBTENER PERROS POR TAMAÑO BD
        Manejadora.OPPT = function () {
            var unaManejadora = new PrimerParcial.Manejadora();
            unaManejadora.ObtenerPerrosPorTamanio();
        };
        Manejadora.prototype.ObtenerPerrosPorTamanio = function () {
            alert("Hola");
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
