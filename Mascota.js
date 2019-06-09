"use strict";
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
//# sourceMappingURL=Mascota.js.map