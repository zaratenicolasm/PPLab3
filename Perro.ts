/// <reference path="Mascota.ts" />
namespace Entidades
{
    export class Perro extends Entidades.Mascota
    {
        protected _nombre:string;
        protected _raza:string;
        protected _pathFoto:string;

        public constructor( tamanio:string, edad:number, precio:number, nombre:string, raza:string, foto:string)
        {
            super(tamanio, edad, precio);
            this._nombre=nombre;
            this._raza=raza;
            this._pathFoto=foto;
        }

        public ToJson():JSON
        {
            var str : string = '{ '+super.ToString()+', "nombre" : "'+this._nombre+'", "raza" : "'+this._raza+'", "foto" : "'+this._pathFoto+'" }';
            var obj:any = JSON.parse(str);
            return obj;
        }
    }
}