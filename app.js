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
                        PrimerParcial.Manejadora.MostrarPerrosJSON();
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
                        alert("Perro agregado en BD");
                        //MUESTRO TABLA ACTUALIZADA
                        //PrimerParcial.Manejadora.MostrarPerrosJSON();
                        //OCULTO EL GIF
                        PrimerParcial.Manejadora.AdministrarGif(false);
                    }
                    else if (obj.SeAgrego == false) {
                        alert("El perro no se agrego en BD");
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
