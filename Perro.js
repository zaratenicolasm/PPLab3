"use strict";
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
//# sourceMappingURL=Perro.js.map